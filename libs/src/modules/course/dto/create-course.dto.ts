import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  state?: boolean;
  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  academicYearId: number;

  @IsNotEmpty()
  @IsInt()
  periodId: number;

  @IsNotEmpty()
  @IsInt()
  schoolId: number;
}
