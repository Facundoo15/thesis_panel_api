import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateThesisDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  abstract: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  submissionDate?: Date;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  professorId: number;

  @IsNotEmpty()
  @IsInt()
  researchDesignId: number;

  @IsNotEmpty()
  @IsInt()
  endThatPurposesId: number;
}
