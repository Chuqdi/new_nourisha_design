import {
  ICartDetail,
  ICartItem,
  IExtraItem,
  IFoodBox,
  IFoodBoxDayType,
  ILocalCartItem,
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
export const localCartItems = [] as ILocalCartItem[];
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
export const DELIVERY_DATE = "";
export const showGiftCardModal = false;
export const showMealExtraSelection: {
  show: boolean;
  meal?: IMeal;
  day: IFoodBoxDayType | undefined;
  onContinue:( proteinId:string, extraId:string, protein?:IExtraItem, swallow?:IExtraItem, )=>void;
} = {
  show: false,
  meal: {} as IMeal,
  day: undefined,
  onContinue:(proteinId, extraId )=>{}
};
export const paymentModal: {
  show: boolean;
  amount: number;
  redirect_url?:string;
  onContinue: () => Promise<{ clientSecret: string; returnUrl: string }>;
  gtagEvent:(clientSecret:string)=> void
} = {
  show: false,
  amount: 0,
  gtagEvent:(c)=>{},
  onContinue: async () => {
    return {
      clientSecret: "",
      returnUrl: "",
    };
  },
};
