import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { hash } from "bcrypt";
import { AccountService } from "src/account/account.service";
import { ZodValidation } from "src/pipes/zod.validation.pipe";
import {
  ValidationBodySchema,
  validationBodySchema,
} from "src/types/zod.types";

@Controller()
export class CreateAccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UsePipes(new ZodValidation(validationBodySchema))
  public async handleCreateAccount(
    @Body() body: ValidationBodySchema
  ): Promise<void> {
    const { email, password } = body; //
    const hashedPassword = await hash(password, 8);
    await this.accountService.createAccount(email, hashedPassword);
  }
}
