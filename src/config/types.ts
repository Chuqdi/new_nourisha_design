export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  is_email_verified?: boolean;
  ref_code?: string;
  createdAt?: string;
  primary_role?: string;
  updatedAt?: string;
  phone: string;
  stripe_id?: string;
  delivery_info?: string;
  subscription_status?: boolean;
  roles?: string[];
  subscription?: string;
  address: {
    address_: string;
    city: string;
    country: string;
    postcode: string;
  };
  preference: {
    allergies: [];
    auto_renew: boolean;
  };
  control: {
    suspended?: boolean;
  };
}

export interface IMeal {
  available_quantity?: string;
  category?: string;
  country?: string;
  orderType?: string;
  is_available: boolean;
  meals?: string[];
  name?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  image_url?: string;
  images?: string[];
  _id?: string;
  price: { amount: number; deliveryFee: number; previousAmount: number };
}

export interface ICartItem {
  item: IMeal;
  quantity: number;
  id: number;
  _id: string;
}

export interface IOrder {
  _id: string;
  items: { item: IMeal }[];
  delivery_address: { address_: string; city: string; country: string };
  subtotal: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  delivery_date: string;
  weekend_delivery: boolean;
  delivery_fee?: string;
}

export interface IPlan {
  _id: string;
  amount?: number;
  createdAt?: string;
  currency?: string;
  delivery_fee?: string;
  name?: string;
  perks: [];
  description?: string;
  price_id?: string;
  product_id: string;
  slug: string;
  subscription_interval?: string;
}

export interface ICartDetail {
  session_id: string;
  createdAt: string;
  customer: string;
  deliveryFee: string;
  subtotal: string;
  total: string;
  updatedAt: string;
}

export interface IBilling {
  amount: string;
  createdAt: string;
  currency: string;
  customer: string;
  item: string;
  itemRefPath: string;
  order_reference: string;
  payment_gateway: string;
  payment_method: string;
  reason: string;
  reference: string;
  status: string;
  stripe_customer_id: string;
  updatedAt: string;
}

export interface IFoodBoxItem {
  first_meal: string;
  last_meal: string;
}
export type IFoodBoxDayType = 
| "Sunday"
| "Monday"
| "Tuesday"
| "Wednesday"
| "Thursday"
| "Friday"
| "Saturday";
export interface IFoodBox {
  day:IFoodBoxDayType;
  meals: IFoodBoxItem;
}
