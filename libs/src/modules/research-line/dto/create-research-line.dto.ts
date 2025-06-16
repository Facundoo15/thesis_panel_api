import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResearchLineDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
