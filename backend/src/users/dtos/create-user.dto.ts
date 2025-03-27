import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {
  @IsNotEmpty({ message: "Nome é obrigatório." })
  name: string;
  
  @IsEmail({}, { message: "Email inválido." })
  @IsNotEmpty({ message: "Email é obrigatório." })
  email: string;

  @IsNotEmpty({ message: "Senha é obrigatória." })
  password: string;
  
  @ApiProperty({ enum: Role, example: Role.USER })
  @IsEnum(Role, { message: "Papel permitido USER ou ADMIN." })
  @IsNotEmpty({ message: "Papel é obrigatório." })
  role: Role;
}
