import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { UserRole } from "src/common/types/user-roles.enum";

export class CreateUserDTO {
  @IsNotEmpty({ message: "Nome é obrigatório." })
  name: string;
  
  @IsEmail({}, { message: "Email inválido." })
  @IsNotEmpty({ message: "Email é obrigatório." })
  email: string;

  @IsNotEmpty({ message: "Senha é obrigatória." })
  password: string;

  @IsEnum(UserRole, { message: "Papel permitido USER ou ADMIN." })
  @IsNotEmpty({ message: "Papel é obrigatório." })
  role: UserRole;
}
