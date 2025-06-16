import {
  IsOptional,
  IsString,
  IsEnum,
  IsDate,
  IsInt,
  IsIn,
} from 'class-validator';
import { ThesisStatus } from '../models/thesis';

export class UpdateThesisDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  abstract?: string;
  @IsOptional()
  @IsEnum(ThesisStatus)
  status?: ThesisStatus;

  @IsOptional()
  @IsDate()
  submissionDate?: Date;

  @IsOptional()
  @IsInt()
  finalGrade?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  professorId?: number;

  @IsOptional()
  @IsInt()
  researchDesignId?: number;

  @IsOptional()
  @IsInt()
  endThatPurposesId?: number;
}
