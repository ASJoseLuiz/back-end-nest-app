import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./types/env.zod.type";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { AccountService } from "./account/account.service";
import { AuthService } from "./auth/auth.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RouterModule } from "@nestjs/core";
import { HomeModule } from "./home/home.module";
import { CreateAccountModule } from "./create-account/create-account.module";
import { AccountConfigModule } from "./account-config/account-config.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    RouterModule.register([
      {
        path: "home",
        module: HomeModule,
        children: [
          { path: "accounts", module: AccountModule }, // GET e POST
          { path: "create-account", module: CreateAccountModule }, // POST
          { path: "login", module: AuthModule }, // POST
          { path: "login/user", module: AccountConfigModule }, // PATCH e DELETE
        ],
      },
    ]),
    AccountModule,
    AuthModule,
    PrismaModule,
    HomeModule,
    CreateAccountModule,
    AccountConfigModule,
  ],
  controllers: [],
  providers: [AccountService, AuthService, PrismaService, JwtService],
})
export class AppModule {}
