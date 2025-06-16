import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
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
  codStudent: string;
  @IsString()
  @IsNotEmpty()
  dni: string;
  @IsString()
  @IsNotEmpty()
  academicLevel: string;
  @IsString()
  @IsNotEmpty()
  entrySemester: string;
}
