import { IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 2,
  })
  password: string;
  @IsNumber()
  roleId: number;
}
