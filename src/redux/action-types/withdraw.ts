import { IUser } from './user';

export interface IWithdraw {
  id?: number;
  userId: number;
  amount: number;
  walletAddress: string;
  state: string;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}
