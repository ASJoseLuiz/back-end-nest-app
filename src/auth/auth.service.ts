import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { TOKEN } from "./token.dto";
import { compareSync as bcryptCompareSync } from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { Env } from "src/types/env.zod.type";
import { PayloadBodySchema } from "src/types/zod.types";

@Injectable()
export class AuthService {
  private privateKeyConfig = this.configService.get<string>("JWT_PRIVATE_KEY");

  constructor(
    private readonly jwt: JwtService, //
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService<Env, true>
  ) {}

  async validation(email: string, password: string): Promise<TOKEN> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !bcryptCompareSync(password, user?.password))
      throw new UnauthorizedException("Email ou Senha inválidos");

    const payload = { sub: user.id, email: user.email };
    const token = this.generateToken(payload);
    return token;
  }

  async generateToken(payload: PayloadBodySchema): Promise<TOKEN> {
    return {
      token: this.jwt.sign(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          privateKey: this.privateKeyConfig,
        }
      ),
    };
  }
}
