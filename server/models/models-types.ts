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
