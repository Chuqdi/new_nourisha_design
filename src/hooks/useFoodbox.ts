import { DAYS_OF_THE_WEEK } from "@/config";
import { IExtraItem, IFoodBoxDayType, IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { useAtom, useAtomValue } from "jotai";
import { DEVICE_ID } from "./useFingerPrint";
import useAuth from "./useAuth";
import { useEffect, useCallback, useState } from "react";
import { MEALEXTRASELECTIONS } from "@/config/storageKeys";
import { useRouter } from "next/navigation";

// Storage keys as constants
const STORAGE_KEYS = {
  FOOD_BOX: "FOOD_BOX_STORE",
  MEAL_EXTRA: "MEAL_EXTRA_STORE",
  DELIVERY_DATE: "DELIVERY_DATE_STORE",
} as const;

// Types for better type safety
interface FoodBoxMeals {
  first_meal: IMeal | null;
  last_meal: IMeal | null;
}

interface FoodBoxDay {
  meals: FoodBoxMeals;
}

interface FoodBoxStore {
  [key: string]: FoodBoxDay;
}

// Custom hook for local storage operations
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const getStoredValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const setStoredValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeStoredValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return { getStoredValue, setStoredValue, removeStoredValue };
};

export default function useFoodbox() {
  const router = useRouter();
  const { getAxiosClient } = useAuth();
  const [loadingLineUpCreation, setLoadingLineUpCreation] = useState(false);

  // Use atoms
  const [boxStore, setBoxStore] = useAtom(ATOMS.foodBox);
  const [mealExtraSelection, setMealExtraSelection] = useAtom(
    ATOMS.mealExtraSelection
  );
  const showMealExtraSelection = useAtomValue(ATOMS.showMealExtraSelection);

  // Initialize storage hooks
  const foodBoxStorage = useLocalStorage<any>(
    STORAGE_KEYS.FOOD_BOX,
    {}
  );
  const mealExtraStorage = useLocalStorage(STORAGE_KEYS.MEAL_EXTRA, []);
  const deliveryDateStorage = useLocalStorage<string | null>(
    STORAGE_KEYS.DELIVERY_DATE,
    null
  );

  const initializeFoodBox = useCallback(() => {
    const storedBox = foodBoxStorage.getStoredValue();
    setBoxStore(storedBox);
  }, [foodBoxStorage, setBoxStore]);

  const initializeFoodMealExtra = useCallback(() => {
    const storedExtra = mealExtraStorage.getStoredValue();
    setMealExtraSelection(storedExtra);
  }, [mealExtraStorage, setMealExtraSelection]);

  const addFoodBox = useCallback(
    (day: IFoodBoxDayType, meal: IMeal) => {
      const currentBox = foodBoxStorage.getStoredValue();

      if (!currentBox[day]) {
        currentBox[day] = {
          meals: { first_meal: null, last_meal: null },
        };
      }

      const { first_meal, last_meal } = currentBox[day].meals;

      if (!first_meal && !last_meal) {
        currentBox[day].meals.first_meal = meal;
      } else if (!last_meal) {
        currentBox[day].meals.last_meal = meal;
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Food selection completed",
        });
        return;
      }

      foodBoxStorage.setStoredValue(currentBox);
      setBoxStore(currentBox);
    },
    [foodBoxStorage, setBoxStore]
  );

  const removeFoodBox = useCallback(
    (day: IFoodBoxDayType, mealId: string) => {
      const currentBox = foodBoxStorage.getStoredValue();

      if (!currentBox[day]) return;

      const { first_meal, last_meal } = currentBox[day].meals;

      if (first_meal?._id === mealId) {
        currentBox[day].meals.first_meal = null;
      } else if (last_meal?._id === mealId) {
        currentBox[day].meals.last_meal = null;
      }

      foodBoxStorage.setStoredValue(currentBox);
      setBoxStore(currentBox);
    },
    [foodBoxStorage, setBoxStore]
  );

  const addExtraItem = useCallback(
    (extra?: IExtraItem, protein?: IExtraItem) => {
      const { meal, day } = showMealExtraSelection;
      const mealExtra = { meal, extra, day, protein };

      const currentExtras = mealExtraStorage.getStoredValue();
      // @ts-ignore
      const updatedExtras = currentExtras.concat(mealExtra);

      mealExtraStorage.setStoredValue(updatedExtras);
      setMealExtraSelection(updatedExtras);
    },
    [showMealExtraSelection, mealExtraStorage, setMealExtraSelection]
  );

  const getMealExtraFromMealAndDay = useCallback(
    (meal: IMeal, day: IFoodBoxDayType) => {
      if (!mealExtraSelection?.length) return;

      return mealExtraSelection.find(
        (item) => item?.meal?._id === meal?._id && day === item?.day
      );
    },
    [mealExtraSelection]
  );

  const getMealCountInStore = useCallback(
    (meal: IMeal) => {
      if (!boxStore) return 0;

      return DAYS_OF_THE_WEEK.reduce((count, day) => {
        // @ts-ignore
        const dayMeal = boxStore[day]?.meals;
        if (!dayMeal) return count;

        return (
          count +
          (dayMeal.first_meal?._id === meal?._id ? 1 : 0) +
          (dayMeal.last_meal?._id === meal?._id ? 1 : 0)
        );
      }, 0);
    },
    [boxStore]
  );

  const createLineUp = useCallback(
    async (delivery_date: string, initializePayment?: () => void) => {
      const deviceId = localStorage.getItem(DEVICE_ID);
      if (!deviceId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Device ID not found",
        });
        return;
      }

      setLoadingLineUpCreation(true);
      const axiosClient = getAxiosClient(deviceId);

      try {
        const { data } = await axiosClient.get("subscriptions/me");

        if (data?.data?.used_sub) {
          initializePayment?.();
          return;
        }

        const lineupData = prepareMealForBE(delivery_date);
        await axiosClient.post("lineups/web", lineupData);

        toast({
          variant: "default",
          title: "Success",
          description: "Line-up created successfully.",
        });

        emptyBox();
        router.push("/");
      } catch (error: any) {
        const message =
          error?.response?.data?.message ?? "Line-up was not created.";

        if (message.includes("Subscription is required")) {
          initializePayment?.();
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: message,
          });
        }
      } finally {
        setLoadingLineUpCreation(false);
      }
    },
    [router, getAxiosClient]
  );

  const emptyBox = useCallback(() => {
    setBoxStore(null);
    setMealExtraSelection([]);
    foodBoxStorage.removeStoredValue();
    mealExtraStorage.removeStoredValue();
    deliveryDateStorage.removeStoredValue();
  }, [
    setBoxStore,
    setMealExtraSelection,
    foodBoxStorage,
    mealExtraStorage,
    deliveryDateStorage,
  ]);
const checkIfBothMealsAreSelected = useCallback(
  (day: IFoodBoxDayType) => {
    const currentBox = foodBoxStorage.getStoredValue();

    if (!currentBox[day]) {
      return {
        isFirstMealAlreadySelected: false,
        isSecondMealAlreadySelected: false,
      };
    }

    return {
      isFirstMealAlreadySelected: !!currentBox[day].meals.first_meal,
      isSecondMealAlreadySelected: !!currentBox[day].meals.last_meal,
    };
  },
  [foodBoxStorage]
);

const prepareMealForBE = useCallback(
  (delivery_date: string) => {
    const returnValue: {
      delivery_date: string;
      [key: string]: any;
    } = { delivery_date };

    DAYS_OF_THE_WEEK.forEach((week) => {
      if (!boxStore) return;
      // @ts-ignore
      const activeDayBox = boxStore[week];
      if (!activeDayBox?.meals) return;

      const meals = activeDayBox.meals as {
        first_meal: IMeal;
        last_meal: IMeal;
      };

      const firstSelectedExtra = getMealExtraFromMealAndDay(
        meals.first_meal,
        week as IFoodBoxDayType
      );

      const secondSelectedExtra = getMealExtraFromMealAndDay(
        meals.last_meal,
        week as IFoodBoxDayType
      );

      const dayKey = week.toLowerCase();
      returnValue[dayKey] = {
        lunch: {
          mealId: meals.first_meal?._id,
          ...(firstSelectedExtra?.extra?._id && {
            extraId: firstSelectedExtra.extra._id,
          }),
          ...(firstSelectedExtra?.protein?._id && {
            proteinId: firstSelectedExtra.protein._id,
          }),
        },
        dinner: {
          mealId: meals.last_meal?._id,
          ...(secondSelectedExtra?.extra?._id && {
            extraId: secondSelectedExtra.extra._id,
          }),
          ...(secondSelectedExtra?.protein?._id && {
            proteinId: secondSelectedExtra.protein._id,
          }),
        },
      };
    });

    return returnValue;
  },
  [boxStore, getMealExtraFromMealAndDay]
);
  // Initialize meal extras from storage on mount
  useEffect(() => {
    const storedExtras = localStorage.getItem(MEALEXTRASELECTIONS);
    if (storedExtras) {
      try {
        setMealExtraSelection(JSON.parse(storedExtras));
      } catch (error) {
        console.error("Error parsing stored meal extras:", error);
      }
    }
  }, [setMealExtraSelection]);

  return {
    initializeFoodBox,
    initializeFoodMealExtra,
    addFoodBox,
    removeFoodBox,
    emptyBox,
    addExtraItem,
    getMealExtraFromMealAndDay,
    checkIfBothMealsAreSelected,
    prepareMealForBE,
    createLineUp,
    loadingLineUpCreation,
    getMealCountInStore,
    setDeliveryDate: deliveryDateStorage.setStoredValue,
    getDeliveryDate: deliveryDateStorage.getStoredValue,
    clearDeliveryDate: deliveryDateStorage.removeStoredValue,
  };
}
