import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserDetails, UserSignup } from '../interfaces/user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginDTO } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(payload: CreateUserDTO): Promise<UserSignup> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('E-mail já está registrado.', {
        cause: new Error(),
        description: 'Usuário já está registrado.',
      });
    }

    const hash = await this.encryptPassword(payload.password, 10);
    payload.password = hash;
    const user = await this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }

  async login(payload: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (!user) throw new UnauthorizedException('E-mail/Senha inválidos.');

    const isMatched = await this.decryptPassword(
      payload.password,
      user.password,
    );

    if (!isMatched) throw new UnauthorizedException('Senha inválida.');

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { expiresIn: '1d' },
    );

    return { accessToken };
  }

  async getUsersAll(): Promise<UserDetails[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
      },
    });
  }

  async getUserById(id: number): Promise<UserDetails> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return user;
  }

  async updateUser(id: number, data: UpdateUserDTO) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async deleteUser(id: number, data: DeleteUserDTO) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        name: true,
        email: true,
        isDeleted: true,
      },
    });
  }


  async encryptPassword(plainText, saltRound) {
    return bcrypt.hash(plainText, saltRound);
  }

  async decryptPassword(plainText, hash) {
    return bcrypt.compare(plainText, hash);
  }
}
