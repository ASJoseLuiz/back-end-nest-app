import { Module } from "@nestjs/common";
import { AccountConfigController } from "./account-config.controller";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "src/account/account.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [JwtService, AccountService, PrismaService],
  controllers: [AccountConfigController],
})
export class AccountConfigModule {}
