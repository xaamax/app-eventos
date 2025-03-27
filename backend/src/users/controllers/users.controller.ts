import { Body, Controller, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { LoginDTO } from '../dtos/login.dto';
import { Unprotected } from 'src/common/decorators/unprotected.decorator';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { DeleteUserDTO } from '../dtos/delete-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  
  @Post('/register')
  async register(
    @Body() 
    createUserDTO: CreateUserDTO) {
    return await this.userService.register(createUserDTO);
  }

  @Unprotected()
  @Post('/login')
  async login(
    @Body() 
    loginDTO: LoginDTO) {
    return await this.userService.login(loginDTO);
  }

  @Get('/profile')
  async profile(
    @Request() request
  ) {
    return request.user;
  }

  @Get('/')
  async findAll() {
    return await this.userService.getUsersAll();
  }

  @Get('/:id/details')
  async findOne(
    @Param('id') id: number
  ) {
    return await this.userService.getUserById(+id);
  }

  @Put('/:id/update')
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO 
  ) {
    return await this.userService.updateUser(+id, updateUserDTO);
  }

  @Patch('/:id/delete')
  async deleteUser(
    @Param('id') id: number,
    @Body() deleteUserDTO: DeleteUserDTO
  ) {
    return await this.userService.deleteUser(+id, deleteUserDTO);
  }
}
