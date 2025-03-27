import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateCategoryDTO {
      @IsNotEmpty({ message: 'Categoria é obrigatória.' })
      category: string;
}