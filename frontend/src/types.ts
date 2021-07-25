export type UserType = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  direction?: string;
};

export type FetchType = {
  token?: string;
  user?: UserType;
  error?: string;
};
