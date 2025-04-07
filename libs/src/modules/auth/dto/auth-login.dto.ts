import { IsEmail } from '@nestjs/class-validator';
import { IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class AuthLoginDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @IsNotEmpty()
  password: string;
}
