import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateSchoolDTO {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  state?: boolean;

  @IsNumber()
  facultyId: number;
}
