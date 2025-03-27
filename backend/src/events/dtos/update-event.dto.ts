import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDTO {
  @IsString()
  @IsNotEmpty({ message: 'Local é obrigatório.' })
  locale: string;

  @IsDate({ message: 'Data inválida.' })
  @IsNotEmpty({ message: 'Data do Evento é obrigatória.' })
  @Type(() => Date)
  dateOfEvent: Date;

  @IsString()
  @IsNotEmpty({ message: 'Tema é obrigatório.' })
  theme: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Palestrante é obrigatório.' })
  speaker: string;

  @IsNotEmpty({ message: 'Total de Pessoas é obrigatório.' })
  @IsNumber({}, { message: 'Total de Pessoas deve ser numérico.' })
  amountPeople: number;

  @IsInt()
  category_id: number;
}
