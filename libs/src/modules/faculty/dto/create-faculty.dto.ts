import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFacultyDTO {
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  state?: boolean;
}
