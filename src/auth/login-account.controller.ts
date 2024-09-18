import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { TOKEN } from "src/auth/token.dto";
import { ZodValidation } from "src/pipes/zod.validation.pipe";
import {
  ValidationBodySchema,
  validationBodySchema,
} from "src/types/zod.types";

@Controller()
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UsePipes(new ZodValidation(validationBodySchema))
  public async handleLogin(@Body() body: ValidationBodySchema): Promise<TOKEN> {
    const { email, password } = body;
    return await this.authService.validation(email, password);
  }
}
