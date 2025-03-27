import { IsNotEmpty } from "class-validator";

export class DeleteCategoryDTO {
      @IsNotEmpty({ message: "Foi excluído? Permitido somente true/false." })
      isDeleted: boolean;
}