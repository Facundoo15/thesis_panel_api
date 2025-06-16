import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ThesisSection } from '../models/thesis-section';

export class CreateThesisContentDTO {
  @IsNumber()
  thesisId: number;

  @IsEnum(ThesisSection)
  section: ThesisSection;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  content: string;
}
