import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { LoginController } from "./login-account.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Env } from "src/types/env.zod.type";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<Env, true>) => {
        return {
          secret: configService.get<string>("JWT_PRIVATE_KEY"),
          signOptions: { expiresIn: "60m" },
        };
      },
    }),
    PrismaModule,
  ],
  providers: [AuthService, PrismaService, JwtService],
  controllers: [LoginController],
})
export class AuthModule {}
