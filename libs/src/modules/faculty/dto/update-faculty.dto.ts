import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFacultyDTO {
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  state?: boolean;
}
