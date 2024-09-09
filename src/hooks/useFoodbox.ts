import { IFoodBoxDayType, IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { useAtom } from "jotai";

const FOOD_BOX_STORE = "FOOD_BOX_STORE";
export default function () {
  const box = localStorage.getItem(FOOD_BOX_STORE);
  const [boxStore, setBoxStore] = useAtom(ATOMS.foodBox);
  const initializeFoodBox = () => {
    const fdBox = localStorage.getItem(FOOD_BOX_STORE);
    setBoxStore(fdBox ? JSON.parse(fdBox) : {});
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

  const emptyBox = () => {
    setBoxStore(null);
    localStorage.removeItem(FOOD_BOX_STORE);
  };

  return {
    initializeFoodBox,
    addFoodBox,
    removeFoodBox,
    emptyBox,
  };
}
