import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateUserDTO {
      @IsNotEmpty({ message: "Nome é obrigatório." })
      name: string;
      
      @IsEmail({}, { message: "Email inválido." })
      @IsNotEmpty({ message: "Email é obrigatório." })
      email: string;
    
      @ApiProperty({ enum: Role, example: Role.USER })
      @IsEnum(Role, { message: "Papel permitido USER ou ADMIN." })
      @IsNotEmpty({ message: "Papel é obrigatório." })
      role: Role;
}