import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'Categoria é obrigatória.' })
  category: string;
}
