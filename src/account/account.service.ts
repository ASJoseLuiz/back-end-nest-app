import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AccountServiceInterface } from "src/interfaces/account-service.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { compareSync } from "bcrypt";
import { Account } from "src/entities/account.entitie";

@Injectable()
export class AccountService implements AccountServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  public async deleteAccountById(
    id: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const verifyAccount = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!verifyAccount) {
        throw new NotFoundException();
      }

      const getAccountByEmail = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (verifyAccount.id != getAccountByEmail.id) {
        // id do token vs id do email passado no body
        throw new UnauthorizedException("Usuário não pode alterar esta conta");
      }

      if (!compareSync(password, verifyAccount.password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      await this.prismaService.user.delete({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async createAccount(email: string, password: string): Promise<void> {
    try {
      const verifyAccount = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (verifyAccount) {
        throw new ConflictException();
      }

      await this.prismaService.user.create({ data: { email, password } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updatePasswordById(
    id: string,
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const verifyAccount = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!verifyAccount) {
        throw new NotFoundException();
      }

      const getAccountByEmail = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (verifyAccount.id != getAccountByEmail.id) {
        // id do token vs id do email passado no body
        throw new UnauthorizedException("Usuário não pode alterar esta conta");
      }

      if (!compareSync(currentPassword, verifyAccount.password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      await this.prismaService.user.update({
        where: { id },
        data: { password: newPassword },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async getAccounts(): Promise<Account[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async getAccountByEmail(email: string): Promise<Account> {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
