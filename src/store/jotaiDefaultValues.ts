import { ICartDetail, ICartItem, IFoodBox } from "@/config/types";

export const SHOW_SIDE_MODAL: { show: boolean; component: React.ReactNode } = {
  show: false,
  component: null,
};

export const FOOD_BOX: IFoodBox | null = null;
export const cartItems = [] as ICartItem[];
export const cartDetails = {} as ICartDetail;
export const cartIsLoading = false;
export const paymentModal: {
  show: boolean;
  onContinue: () => Promise<{ clientSecret: string; returnUrl: string }>;
} = {
  show: false,
  onContinue: async () => {
    return {
      clientSecret: "",
      returnUrl: "",
    };
  },
};
