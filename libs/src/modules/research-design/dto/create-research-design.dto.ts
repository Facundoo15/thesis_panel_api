import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResearchDesignDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
