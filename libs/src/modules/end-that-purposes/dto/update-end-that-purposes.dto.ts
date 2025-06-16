import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEndThatPurposes {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  code: string;
}
