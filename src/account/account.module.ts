import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { PrismaService } from "src/prisma/prisma.service";
import { GetAccountsController } from "./get-accounts.controller";
import { JwtService } from "@nestjs/jwt";
import { AuthenticateGuard } from "src/guards/authentication.guard";

@Module({
  controllers: [GetAccountsController],
  providers: [AccountService, PrismaService, JwtService, AuthenticateGuard],
})
export class AccountModule {}
