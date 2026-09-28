export type RequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface Product {
  _id: string;
  uid?: string;
  title: string;
  heading: string;
  price: number;
  img: string[];
  freeShipping: boolean;
  newArrival: boolean;
  quantity: number;
  description: string;
  category: string;
  brand: string;
  condition: "New" | "Used" | "Refurbished";
  rating: number;
  discount: number;
  payableAmount: number;
}

export type ProductInput = Omit<Product, "_id">;

export type ProductFilter =
  | {
      type: "Condition";
      value: "Any" | "New" | "Used" | "Refurbished";
    }
  | {
      type: "Brands" | "Features" | "Rating";
      value: string[];
    };

export interface ProductState {
  Products: Product[];
  Filters: ProductFilter[];
  SelectedProduct: Product | null;
  status: RequestStatus;
  error: string | null;
}

export interface CatalogItem {
  _id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface CatalogState {
  categories: CatalogItem[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

export interface Coupon {
  _id: string;
  couponName: string;
  couponCode: string;
  discountPercentage: number;
  expirationDate: string;
  maxUsage: number;
  usedtimes?: number;
  status?: "active" | "expired" | "used" | string;
  createdAt?: string;
}

export interface CouponState {
  Coupons: Coupon[];
  SelectedCouponId: string | null;
  status: RequestStatus;
  error: string | null;
  message: string | null;
}

export interface OrderAddress {
  fullName?: string;
  city?: string;
  country?: string;
  postalZipCode?: string;
  addressLine1?: string;
}

export interface Order {
  _id: string;
  status: string;
  payableAmount: number;
  createdAt: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  shippingAddress?: OrderAddress;
  billingAddress?: OrderAddress;
  items?: Array<{
    product?: Product;
    quantity: number;
    price?: number;
  }>;
  paymentMethod?: string;
  paymentReceipt?: string;
  couponApplied?: boolean;
  couponDiscount?: number;
}

export interface OrderState {
  orders: Order[];
  selectedOrderId: string | null;
  status: RequestStatus;
  error: string | null;
}

export interface Notification {
  _id: string;
  isRead: boolean;
  message?: string;
  createdAt?: string;
  type?: "General" | "Order" | "Coupon" | "Product" | "Growth" | "System" | "Promotional" | string;
}

export interface Customer {
  _id: string;
  name: string;
  city?: string;
  totalOrders?: number;
  email: string;
  phoneNumber?: string;
  createdAt?: string;
}

export interface SettingState {
  categories: CatalogItem[];
  brands: CatalogItem[];
  notifications: Notification[];
  loading: boolean;
  message: string;
  sidebarOpen: boolean;
  error: string | null;
}

export interface AuthUser {
  _id: string;
  email: string;
  storeID: string;
  userName: string;
  storeName: string;
  storeURL?: string;
  storeDescription?: string;
  storeDeliveryCharges?: string;
  storePaymentMethods?: PaymentMethod[];
}

export interface PaymentMethod {
  type: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  enabled: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  message: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}