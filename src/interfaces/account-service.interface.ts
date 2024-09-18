import { Account } from "src/entities/account.entitie";

export interface AccountServiceInterface {
  createAccount(email: string, password: string): Promise<void>;
  deleteAccount(email: string, password: string): Promise<void>;
  updatePassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void>;
  getAccounts(): Promise<Account[]>;
  getAccountByEmail(email: string): Promise<Account>;
}
