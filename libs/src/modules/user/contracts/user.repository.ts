import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { User } from '../models/user';
import { ResponseUserDTO } from '../dto/response-user.dto';

export const USER_REPOSITORY_KEY = Symbol('IUserRepository');

export interface IUserRepository
  extends IReadableRepository<User>,
    IWriteableRepository<User> {
  findByEmail(email: string): Promise<User>;
  findByRoleId(roleId: number): Promise<ResponseUserDTO[] | null>;
}
