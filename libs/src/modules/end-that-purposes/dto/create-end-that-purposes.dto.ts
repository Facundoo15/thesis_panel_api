import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEndThatPurposesDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
