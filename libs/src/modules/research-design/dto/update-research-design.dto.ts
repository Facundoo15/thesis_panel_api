import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateResearchDesignDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
