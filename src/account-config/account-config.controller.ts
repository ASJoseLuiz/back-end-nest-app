import {
  Body,
  Controller,
  Delete,
  Patch,
  UseGuards,
  UsePipes,
  Request,
} from "@nestjs/common";
import { hash } from "bcrypt";
import { AccountService } from "src/account/account.service";
import { AuthenticateGuard } from "src/guards/authentication.guard";
import { ZodValidation } from "src/pipes/zod.validation.pipe";
import {
  deleteAccountBodySchema,
  DeleteAccountBodySchema,
  UpdatePasswordBodySchema,
  updatePasswordBodySchema,
} from "src/types/zod.types";

@Controller()
export class AccountConfigController {
  constructor(private readonly accountService: AccountService) {}

  @Delete()
  @UseGuards(AuthenticateGuard)
  @UsePipes(new ZodValidation(deleteAccountBodySchema))
  public async handleDeleteAccountByID(
    @Request() req,
    @Body() body: DeleteAccountBodySchema
  ): Promise<void> {
    const id = req.user.sub; // Pegando o ID do usuário do JWT token
    const { email, password } = body;
    await this.accountService.deleteAccountById(id, email, password);
  }

  @Patch()
  @UseGuards(AuthenticateGuard)
  @UsePipes(new ZodValidation(updatePasswordBodySchema))
  public async handleUpdatePassword(
    @Request() req,
    @Body() body: UpdatePasswordBodySchema
  ): Promise<void> {
    const id = req.user.sub;
    const { email, currentPassword, newPassword } = body;
    const hashedNewPassword = await hash(newPassword, 8);
    await this.accountService.updatePasswordById(
      id,
      email,
      currentPassword,
      hashedNewPassword
    );
  }
}
