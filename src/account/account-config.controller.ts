import {
  Body,
  Controller,
  Delete,
  Patch,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { AuthenticateGuard } from "src/guards/authentication.guard";
import { ZodValidation } from "src/pipes/zod.validation.pipe";
import {
  UpdatePasswordBodySchema,
  updatePasswordBodySchema,
  ValidationBodySchema,
  validationBodySchema,
} from "src/types/zod.types";

@Controller("login/user")
export class AccountConfigController {
  constructor(private readonly accountService: AccountService) {}

  @Delete()
  @UseGuards(AuthenticateGuard)
  @UsePipes(new ZodValidation(validationBodySchema))
  public async handleDeleteAccount(
    @Body() body: ValidationBodySchema
  ): Promise<void> {
    const { email, password } = body;
    await this.accountService.deleteAccount(email, password);
  }

  @Patch()
  @UseGuards(AuthenticateGuard)
  @UsePipes(new ZodValidation(updatePasswordBodySchema))
  public async handleUpdatePassword(
    @Body() body: UpdatePasswordBodySchema
  ): Promise<void> {
    const { email, currentPassword, newPassword } = body;
    await this.accountService.updatePassword(
      email,
      currentPassword,
      newPassword
    );
  }
}
