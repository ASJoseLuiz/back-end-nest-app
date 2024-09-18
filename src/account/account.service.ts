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

  public async deleteAccount(email: string, password: string): Promise<void> {
    try {
      const verifyAccount = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!verifyAccount) {
        throw new NotFoundException();
      }

      if (!compareSync(password, verifyAccount.password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      await this.prismaService.user.delete({ where: { email } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async deleteAccountByID(id: string, password: string): Promise<void> {
    try {
      const verifyAccount = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!verifyAccount) {
        throw new NotFoundException();
      }

      if (!compareSync(password, verifyAccount.password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      await this.prismaService.user.delete({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async updatePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const verifyUser = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!verifyUser) {
        throw new NotFoundException();
      }

      if (!compareSync(currentPassword, verifyUser.password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      await this.prismaService.user.update({
        where: { email },
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
      throw new InternalServerErrorException(err);
    }
  }
}
