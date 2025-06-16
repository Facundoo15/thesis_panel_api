import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateAcademicYearDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(2025, { message: 'Año academico mayor a 2024 por favor' })
  numYear: number;

  @IsBoolean()
  @IsOptional()
  stateYear?: boolean;
}
