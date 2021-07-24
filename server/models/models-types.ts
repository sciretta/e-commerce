export enum UserTypes {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface UserInterface {
  id?: string;
  type?: UserTypes.Admin | UserTypes.User;
  email?: string;
  password?: string;
}
