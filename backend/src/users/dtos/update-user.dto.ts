import { Role } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUser {
      @IsNotEmpty({ message: "Nome é obrigatório." })
      name: string;
      
      @IsEmail({}, { message: "Email inválido." })
      @IsNotEmpty({ message: "Email é obrigatório." })
      email: string;
    
      @IsOptional()
      password: string;
    
      @IsEnum(Role, { message: "Papel permitido USER ou ADMIN." })
      @IsNotEmpty({ message: "Papel é obrigatório." })
      role: Role;
}