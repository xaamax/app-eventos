import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { LoginDTO } from '../dtos/login.dto';
import { Unprotected } from 'src/common/decorators/unprotected.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  
  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.register(createUserDTO);
  }

  @Unprotected()
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.userService.login(loginDTO);
  }

  @Get('/profile')
  async profile(
    @Request() request
  ) {
    return request.user;
  }

  @Get('/')
  findAll() {
    return ':: GET Users ::';
  }

  @Get('/users/:id')
  findById() {
    return ':: GET Users By Id ::';
  }

  @Put('/:id/update')
  update() {
    return ':: PUT User ::';
  }
}
