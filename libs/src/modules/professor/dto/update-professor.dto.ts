import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProfessorDTO {
  @IsOptional()
  @IsString()
  codProfessor?: string;

  @IsOptional()
  @IsString()
  orcid?: string;

  @IsOptional()
  @IsString()
  academicDegree?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
