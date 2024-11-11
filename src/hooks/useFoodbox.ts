import { DAYS_OF_THE_WEEK } from "@/config";
import { IExtraItem, IFoodBoxDayType, IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { DEVICE_ID } from "./useFingerPrint";
import useAuth from "./useAuth";
import { useRef, useState } from "react";

const FOOD_BOX_STORE = "FOOD_BOX_STORE";
const MEAL_EXTRA_STORE = "MEAL_EXTRA_STORE";

export default function () {
  const box = localStorage.getItem(FOOD_BOX_STORE);
  const [boxStore, setBoxStore] = useAtom(ATOMS.foodBox);
  const { getAxiosClient } = useAuth();
  const [loadingLineUpCreation, setLoadingLineUpCreation] = useState(false);
  const continueCreateLineUpProcess = useRef<boolean>(true);

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

  const emptyBox = () => {
    setBoxStore(null);
    localStorage.removeItem(FOOD_BOX_STORE);
  };

  const prepareMealForBE = (delivery_date: string) => {
    let returnValue = { delivery_date };
    DAYS_OF_THE_WEEK.forEach((week) => {
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
            extraId: firstSelectedExtra?.extra?._id,
            proteinId: firstSelectedExtra?.protein?._id,
          },
          dinner: {
            mealId: meals?.last_meal?._id,
            extraId: secondSelectedExtra?.extra?._id,
            proteinId: secondSelectedExtra?.protein?._id,
          },
        };
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
        .post(`lineups/web`, {
          ...data,
          delivery_date: delivery_date ?? "",
        })
        .then((data) => {
           toast({
            variant: "default",
            title: "Success",
            description: "Line-up created successfully.",
          });
          emptyBox();
        })
        .catch((err) => {
          let msg = err?.response?.data?.message ?? "Line-up was not created.";
          if (msg?.includes("Subscription is required")) {
            initializePayment!!();
          }else{
            alert(msg)
          }
        })
        .finally(() => {
          setLoadingLineUpCreation(false);
        });
    }
  };

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
  };
}
