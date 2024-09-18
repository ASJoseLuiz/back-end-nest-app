import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Env } from "src/types/env.zod.type";

@Injectable()
export class AuthenticateGuard implements CanActivate {
  private secretKey = this.configService.get<string>("JWT_PRIVATE_KEY");

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Env, true>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers["authorization"];
    console.log("Authorization Header:", authHeader); // Verificar se o header de autorização existe e está correto

    if (!authHeader) {
      throw new UnauthorizedException("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1]; // Verifica se o formato é "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: this.secretKey });
      request.user = decoded;
      console.log("Decoded JWT:", request.user);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }

    return true;
  }
}
