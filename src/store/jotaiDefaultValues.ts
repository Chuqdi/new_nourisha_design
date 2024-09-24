import { ICartDetail, ICartItem, IFoodBox, IMeal } from "@/config/types";

export const SHOW_SIDE_MODAL: { show: boolean; component: React.ReactNode } = {
  show: false,
  component: null,
};

export const FOOD_BOX: IFoodBox | null = null;
export const cartItems = [] as ICartItem[];
export const cartDetails = {} as ICartDetail;
export const cartIsLoading = false;
export const foodInfoModal:{show:boolean, meal:IMeal} = {
  show:false,
  meal:{} as IMeal
}
export const paymentModal: {
  show: boolean;
  amount:number;
  onContinue: () => Promise<{ clientSecret: string; returnUrl: string }>;
} = {
  show: false,
  amount:0,
  onContinue: async () => {
    return {
      clientSecret: "",
      returnUrl: "",
    };
  },
};
