export type UserType = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  direction?: string;
  role: string;
};

export type ProductType = {
  id: string;
  name: string;
  stock: number;
  price: number;
  image: string;
};

export type FetchType = {
  token?: string;
  user?: UserType;
  products?: ProductType[];
  successPurchase?: boolean;
  error?: string;
};

export enum MainViews {
  Products = 'PRODUCTS',
  Management = 'MANAGEMENT',
  User = 'USER',
}

export type PurchaseProductType = {
  productId: string;
  name: string;
  count: number;
  unitPrice: number;
};

export type PurchaseType = {
  userId: string;
  products: PurchaseProductType[];
};

export type ProductCartType = ProductType & { count: number };
