import { Exclude, Expose, Type } from 'class-transformer';
import { Role } from '../../role/models';
import { UserStatus } from '../models/user';
import { RoleDTO } from '../../role/dto/response-role.dto';

export class ResponseUserDTO {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  status: UserStatus;

  @Expose()
  @Type(() => RoleDTO)
  role: Role;

  @Expose()
  verifiedAt?: Date;

  // campos a excluir
  @Exclude()
  password: string;

  @Exclude()
  roleId: number;

  @Exclude()
  resetToken?: string;

  @Exclude()
  resetTokenExpiration?: string;
}
