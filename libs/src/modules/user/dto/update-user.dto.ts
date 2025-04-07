import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserStatus } from '../models/user';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserStatus, { message: 'Invalid status value' })
  status?: UserStatus;
}
