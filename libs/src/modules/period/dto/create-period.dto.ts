import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePeriodDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  period: number;

  @IsBoolean()
  @IsOptional()
  state?: boolean;

  @IsNotEmpty()
  @IsNumber()
  academicYearId: number;
}
