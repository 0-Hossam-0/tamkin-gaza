import { TUser } from "./IUser";

export type TPayments = {
  id: string;
  user: TUser;
  amount: number;
  provider: string;
  currency:string
  createdAt: Date;
};
