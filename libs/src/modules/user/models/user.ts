import { BaseModel } from '@lib/src/common/models';
import { Role } from '../../role/models';

export class User extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status?: UserStatus;
  // Relación con el rol
  roleId: number;
  role?: Role;
  
  verifiedAt?: Date;
  resetToken?: string;
  resetTokenExpiration?: string;
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}
