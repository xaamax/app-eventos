import { IsNotEmpty } from "class-validator";

export class DeleteUserDTO {
      @IsNotEmpty({ message: "Foi excluído? Permitido somente true/false." })
      isDeleted: boolean;
}