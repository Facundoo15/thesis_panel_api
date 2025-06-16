import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateResearchLineDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
