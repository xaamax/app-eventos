import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    
    @Post('/register')
    register(@Body() createUserDTO: CreateUserDTO){
        return this.userService.register(createUserDTO)
    }

    @Get('/')
    findAll(){
        return ":: GET Users ::"
    }
  
    @Get('/users/:id')
    findById(){
        return ":: GET Users By Id ::"
    }
  
    @Put('/:id/update')
    updateUser(){
        return ":: PUT User ::"
    }
}
