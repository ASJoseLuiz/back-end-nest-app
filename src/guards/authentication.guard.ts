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

    console.log(request.user);
    // Logando o request inteiro para ver o que está disponível
    console.log("Request Headers:", request.headers);

    const authHeader = request.headers["authorization"];
    console.log("Authorization Header:", authHeader); // Verificar se o header de autorização existe e está correto

    if (!authHeader) {
      console.error("Authorization header is missing");
      throw new UnauthorizedException("Authorization header is missing");
    }

    // Logando o token após o split
    const token = authHeader.split(" ")[1]; // Verifica se o formato é "Bearer <token>"
    console.log("Extracted Token:", token);

    if (!token) {
      console.error("Token is missing");
      throw new UnauthorizedException("Token is missing");
    }

    try {
      // Logando a verificação do JWT e o payload decodificado
      const decoded = this.jwtService.verify(token, { secret: this.secretKey });
      console.log("Decoded JWT:", decoded);
      request.user = decoded;
      console.log(request.user);
    } catch (error) {
      console.error("Invalid Token:", error.message); // Logar a mensagem de erro específica
      throw new UnauthorizedException("Token inválido");
    }

    // Verificando os headers e o usuário após a autenticação
    console.log("Request Headers after Auth:", request.headers);
    console.log("User assigned to request:", request.user);

    return true; // Temporariamente sempre retornando true
  }
}
