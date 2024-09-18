import { Module } from "@nestjs/common";
import { CreateAccountController } from "./create-account.controller";
import { AccountService } from "src/account/account.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [AccountService, PrismaService],
  controllers: [CreateAccountController],
})
export class CreateAccountModule {}
