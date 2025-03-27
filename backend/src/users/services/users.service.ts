import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserSignup } from '../interfaces/user';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService { 
  constructor(private prisma: PrismaService){}

  async register(
    payload: CreateUserDTO,
  ): Promise<UserSignup> {
    const hash = await this.encryptPassword(payload.password, 10)
    payload.password = hash
    return this.prisma.user.create({
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
      }
    })
  }

  async encryptPassword(plainText, saltRound){
      return bcrypt.hash(plainText, saltRound);
  }
}
