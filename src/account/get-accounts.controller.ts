import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { Account } from "src/entities/account.entitie";
import { ZodValidation } from "src/pipes/zod.validation.pipe";
import {
  GetAccountByEmailSchema,
  getAccountByEmailSchema,
} from "src/types/zod.types";

@Controller()
export class GetAccountsController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  public async handleGetAccounts(): Promise<Account[]> {
    return await this.accountService.getAccounts();
  }

  @Post()
  @UsePipes(new ZodValidation(getAccountByEmailSchema))
  public async handleGetAccount(
    @Body() body: GetAccountByEmailSchema
  ): Promise<Account> {
    const { email } = body;
    return await this.accountService.getAccountByEmail(email);
  }
}
