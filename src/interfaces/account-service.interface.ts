import { Account } from "src/entities/account.entitie";

export interface AccountServiceInterface {
  createAccount(email: string, password: string): Promise<void>;
  deleteAccountById(id: string, email: string, password: string): Promise<void>;
  updatePasswordById(
    id: string,
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void>;
  getAccounts(): Promise<Account[]>;
  getAccountByEmail(email: string): Promise<Account>;
}
