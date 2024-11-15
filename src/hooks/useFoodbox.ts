import { DAYS_OF_THE_WEEK } from "@/config";
import { IExtraItem, IFoodBoxDayType, IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { DEVICE_ID } from "./useFingerPrint";
import useAuth from "./useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { MEALEXTRASELECTIONS } from "@/config/storageKeys";
import { useRouter, useSearchParams } from "next/navigation";

const FOOD_BOX_STORE = "FOOD_BOX_STORE";
const MEAL_EXTRA_STORE = "MEAL_EXTRA_STORE";

export default function useFoodbox() {
  const box = localStorage.getItem(FOOD_BOX_STORE);
  const [boxStore, setBoxStore] = useAtom(ATOMS.foodBox);
  const { getAxiosClient } = useAuth();
  const searchParams = useSearchParams();
  const [loadingLineUpCreation, setLoadingLineUpCreation] = useState(false);
  const continueCreateLineUpProcess = useRef<boolean>(true);
  const router = useRouter();
  const isWeekly = useMemo(
    () => searchParams.get("plan")?.includes("5".toUpperCase()),
    [searchParams]
  );

  const [mealExtraSelection, setMealExtraSelection] = useAtom(
    ATOMS.mealExtraSelection
  );
  const showMealExtraSelection = useAtomValue(ATOMS.showMealExtraSelection);
  const initializeFoodBox = () => {
    const fdBox = localStorage.getItem(FOOD_BOX_STORE);
    setBoxStore(fdBox ? JSON.parse(fdBox) : {});
  };

  const initializeFoodMealExtra = () => {
    const fdBoxExtra = localStorage.getItem(MEAL_EXTRA_STORE);
    setMealExtraSelection(fdBoxExtra ? JSON.parse(fdBoxExtra) : {});
  };
  const addFoodBox = (
    day: IFoodBoxDayType,
    meal: IMeal,
    proteinId?: string,
    extraId?: string
  ) => {
    let foodBox;
    if (box) {
      foodBox = JSON.parse(box);
      if (!foodBox[day]) {
        foodBox[day] = {
          meals: {
            first_meal: null,
            last_meal: null,
          },
        };
      }
    } else {
      foodBox = {};
      //@ts-ignore
      foodBox[day] = {
        meals: {
          first_meal: null,
          last_meal: null,
        },
      };
    }
    const isFirstMealAlreadySelected = foodBox[day].meals["first_meal"];
    const isSecondMealAlreadySelected = foodBox[day].meals["last_meal"];

    const isAllMealsSelected =
      isFirstMealAlreadySelected && isSecondMealAlreadySelected;

    if (!isAllMealsSelected && !isFirstMealAlreadySelected) {
      foodBox[day].meals["first_meal"] = meal;
    } else if (!isAllMealsSelected && !isSecondMealAlreadySelected) {
      foodBox[day].meals["last_meal"] = meal;
    }

    if (isAllMealsSelected) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Food selection completed",
      });
    }

    localStorage.setItem(FOOD_BOX_STORE, JSON.stringify(foodBox));
    setBoxStore(foodBox);
  };

  const removeFoodBox = (day: IFoodBoxDayType, meal_id: string) => {
    let foodBox = JSON.parse(box!);

    const firstMealAlreadySelected = foodBox[day].meals["first_meal"];
    const secondMealAlreadySelected = foodBox[day].meals["last_meal"];

    if (firstMealAlreadySelected?._id === meal_id) {
      foodBox[day].meals["first_meal"] = null;
    } else if (secondMealAlreadySelected?._id === meal_id) {
      foodBox[day].meals["last_meal"] = null;
    }
    localStorage.setItem(FOOD_BOX_STORE, JSON.stringify(foodBox));
    setBoxStore(foodBox);
  };

  const addExtraItem = (extra?: IExtraItem, protein?: IExtraItem) => {
    const { meal, day } = showMealExtraSelection;
    const mealExtra = {
      meal,
      extra,
      day,
      protein,
    };
    const extraStore = localStorage.getItem(MEAL_EXTRA_STORE);
    if (extraStore) {
      const storedExtra = JSON.parse(extraStore ?? []);
      storedExtra.concat(mealExtra);
      localStorage.setItem(MEAL_EXTRA_STORE, JSON.stringify(storedExtra));
      setMealExtraSelection(storedExtra);
    } else {
      localStorage.setItem(MEAL_EXTRA_STORE, JSON.stringify([mealExtra]));
      setMealExtraSelection([mealExtra]);
    }
  };

  const checkIfBothMealsAreSelected = (day: IFoodBoxDayType) => {
    let foodBox;
    if (box) {
      foodBox = JSON.parse(box);
      if (!foodBox[day]) {
        foodBox[day] = {
          meals: {
            first_meal: null,
            last_meal: null,
          },
        };
      }
    } else {
      foodBox = {};
      //@ts-ignore
      foodBox[day] = {
        meals: {
          first_meal: null,
          last_meal: null,
        },
      };
    }
    const isFirstMealAlreadySelected = foodBox[day].meals["first_meal"];
    const isSecondMealAlreadySelected = foodBox[day].meals["last_meal"];
    return {
      isFirstMealAlreadySelected: !!isFirstMealAlreadySelected,
      isSecondMealAlreadySelected: !!isSecondMealAlreadySelected,
    };
  };

  const getMealExtraFromMealAndDay = (meal: IMeal, day: IFoodBoxDayType) => {
    if (mealExtraSelection && !!mealExtraSelection?.length) {
      const storedExtra = mealExtraSelection;
      const selectedExtra = (storedExtra ?? [])?.find((item) => {
        return item?.meal?._id === meal?._id && day === item?.day;
      });
      return selectedExtra;
    }
  };

  const getMealCountInStore = (meal: IMeal) => {
    let count = 0;
    DAYS_OF_THE_WEEK?.map((day) => {
      if (boxStore) {
        //@ts-ignore
        const currentDayMeal = boxStore[day];
        const meals = currentDayMeal?.meals;
        if (
          meals?.first_meal?._id === meal?._id ||
          meals?.last_meal?._id === meal?._id
        ) {
          count = count + 1;
        }
      }
    });

    return count;
  };

  const emptyBox = () => {
    setBoxStore(null);
    setMealExtraSelection([]);
    localStorage.removeItem(FOOD_BOX_STORE);
    localStorage.removeItem(MEALEXTRASELECTIONS);
  };

  const weeks = useMemo(() => {
    if (isWeekly) {
      return DAYS_OF_THE_WEEK.filter((wk) => {
        return !(wk === "Sunday") && !(wk === "Saturday");
      });
    }

    return DAYS_OF_THE_WEEK;
  }, [isWeekly]);

  const prepareMealForBE = (delivery_date: string) => {
    let returnValue = { delivery_date };
    weeks.forEach((week) => {
      if (boxStore) {
        //@ts-ignore
        const activeDayBox = boxStore[week];
        const meals = activeDayBox?.meals as {
          first_meal: IMeal;
          last_meal: IMeal;
        };
        const firstSelectedExtra = getMealExtraFromMealAndDay(
          meals?.first_meal,
          week as IFoodBoxDayType
        );

        const secondSelectedExtra = getMealExtraFromMealAndDay(
          meals?.last_meal,
          week as IFoodBoxDayType
        );

        //@ts-ignore
        returnValue[week?.toLowerCase()] = {
          lunch: {
            mealId: meals?.first_meal?._id,
            // extraId: firstSelectedExtra?.extra?._id,
            // proteinId: firstSelectedExtra?.protein?._id,
          },
          dinner: {
            mealId: meals?.last_meal?._id,
            // extraId: secondSelectedExtra?.extra?._id,
            // proteinId: secondSelectedExtra?.protein?._id,
          },
        };

        if (firstSelectedExtra?.extra?._id) {
          //@ts-ignore
          returnValue[week?.toLowerCase()].lunch.extraId =
            firstSelectedExtra?.extra?._id;
        }

        if (firstSelectedExtra?.protein?._id) {
          //@ts-ignore
          returnValue[week?.toLowerCase()].lunch.proteinId =
            firstSelectedExtra?.protein?._id;
        }

        if (secondSelectedExtra?.extra?._id) {
          //@ts-ignore
          returnValue[week?.toLowerCase()].dinner.extraId =
            secondSelectedExtra?.extra?._id;
        }

        if (secondSelectedExtra?.protein?._id) {
          //@ts-ignore
          returnValue[week?.toLowerCase()].dinner.proteinId =
            secondSelectedExtra?.protein?._id;
        }
      }

      return undefined;
    });
    return returnValue;
  };

  const createLineUp = async (
    delivery_date: string,
    initializePayment?: () => void
  ) => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);

    setLoadingLineUpCreation(true);
    await axiosClient
      .get("subscriptions/me")
      .then((data) => {
        if (data?.data?.data?.used_sub) {
          initializePayment!!();
          setLoadingLineUpCreation(false);
          continueCreateLineUpProcess.current = false;
          return;
        }
      })
      .catch((err) => {
        let msg = err?.response?.data?.message ?? "Line-up was not created.";
        toast({
          variant: "destructive",
          title: "Error",
          description: msg,
        });
      });

    if (continueCreateLineUpProcess.current) {
      const data = prepareMealForBE(delivery_date);
      axiosClient
        .post(`lineups/web`, data)
        .then((data) => {
          toast({
            variant: "default",
            title: "Success",
            description: "Line-up created successfully.",
          });
          emptyBox();
          router.push("/");
        })
        .catch((err) => {
          let msg = err?.response?.data?.message ?? "Line-up was not created.";
          if (msg?.includes("Subscription is required")) {
            initializePayment!!();
          } else {
            alert(msg);
          }
        })
        .finally(() => {
          setLoadingLineUpCreation(false);
        });
    }
  };

  useEffect(() => {
    const v = localStorage.getItem(MEALEXTRASELECTIONS);
    if (v) {
      try {
        setMealExtraSelection(JSON.parse(v));
      } catch (e) {}
    }
  }, []);

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
  };
}
