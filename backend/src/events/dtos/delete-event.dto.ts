import { IsNotEmpty } from "class-validator";

export class DeleteEventDTO {
      @IsNotEmpty({ message: "Foi excluído? Permitido somente true/false." })
      isDeleted: boolean;
}