import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateProfessorDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 2,
  })
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @IsString()
  @IsNotEmpty()
  codProfessor: string;

  @IsString()
  @IsNotEmpty()
  orcid: string;

  @IsString()
  @IsNotEmpty()
  academicDegree: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
