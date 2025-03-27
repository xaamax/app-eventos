import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
      @IsEmail({}, { message: "Email inválido." })
      @IsNotEmpty({ message: "Email é obrigatório." })
      email: string;
    
      @IsNotEmpty({ message: "Senha é obrigatória." })
      password: string;
}