import {
  IExtraItem,
  IFoodBoxDayType,
  IMeal,
  IStoredExtraType,
} from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { atom, useAtom, useAtomValue } from "jotai";

const FOOD_BOX_STORE = "FOOD_BOX_STORE";
const MEAL_EXTRA_STORE = "MEAL_EXTRA_STORE";

export default function () {
  const box = localStorage.getItem(FOOD_BOX_STORE);
  const [boxStore, setBoxStore] = useAtom(ATOMS.foodBox);
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
  const addFoodBox = (day: IFoodBoxDayType, meal: IMeal) => {
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
        description: "Food selected ",
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

  const addExtraItem = (extra?: IExtraItem) => {
    const { meal, day } = showMealExtraSelection;
    const mealExtra = {
      meal,
      extra,
      day,
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

  const checkIfBothMealsAreSelected =(day:IFoodBoxDayType)=>{
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
      isFirstMealAlreadySelected:!!isFirstMealAlreadySelected,
      isSecondMealAlreadySelected:!!isSecondMealAlreadySelected,
    };


  }

  const getMealExtraFromMealAndDay = (meal: IMeal, day: IFoodBoxDayType) => {
    if (mealExtraSelection && !!mealExtraSelection?.length) {
      const storedExtra =mealExtraSelection;
      const selectedExtra = (storedExtra??[])?.find((item) => {
        return item?.meal?._id === meal?._id && day === item?.day;
      });
      return selectedExtra;
    }
  };

  const emptyBox = () => {
    setBoxStore(null);
    localStorage.removeItem(FOOD_BOX_STORE);
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
  };
}
