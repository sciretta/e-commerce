export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface UserInterface {
  id?: string;
  role?: UserRole.Admin | UserRole.User;
  firstName?: string;
  lastName?: string;
  direction?: string;
  email?: string;
  password?: string;
}

export interface ProductInterface {
  id?: string;
  name?: string;
  price?: number;
  stock?: number;
  image?: string;
}
