import {
  ICartDetail,
  ICartItem,
  IFoodBox,
  IFoodBoxDayType,
  IMeal,
  IStoredExtraType,
  IUser,
} from "@/config/types";

export const SHOW_SIDE_MODAL: { show: boolean; component: React.ReactNode } = {
  show: false,
  component: null,
};

export const FOOD_BOX: IFoodBox | null = null;
export const cartItems = [] as ICartItem[];
export const cartDetails = {} as ICartDetail;
export const cartIsLoading = false;
export const device_id = "";
export const showMobileCartModal = {
  show:false,
  showDetails:false,
};
export const couponCode:{show:boolean, value:string|undefined} = {
  show: false,
  value: undefined,
};
export const foodInfoModal: { show: boolean; meal: IMeal } = {
  show: false,
  meal: {} as IMeal,
};
export const showInfoModal: { show: boolean; meal: IMeal; day?: string } = {
  show: false,
  meal: {} as IMeal,
};

export const mealExtraSelection: IStoredExtraType[] = [];
export const showMealExtraSelection: {
  show: boolean;
  meal?: IMeal;
  day: IFoodBoxDayType | undefined;
} = {
  show: false,
  meal: {} as IMeal,
  day: undefined,
};
export const paymentModal: {
  show: boolean;
  amount: number;
  onContinue: () => Promise<{ clientSecret: string; returnUrl: string }>;
} = {
  show: false,
  amount: 0,
  onContinue: async () => {
    return {
      clientSecret: "",
      returnUrl: "",
    };
  },
};
