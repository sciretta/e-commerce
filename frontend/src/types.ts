export type UserType = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  direction?: string;
  role: string;
};

export type ProductType = {
  name: string;
  stock: number;
  price: number;
  image: string;
};

export type FetchType = {
  token?: string;
  user?: UserType;
  products?: ProductType[];
  error?: string;
};

export enum MainViews {
  Products = 'PRODUCTS',
  Management = 'MANAGEMENT',
  User = 'USER',
}
