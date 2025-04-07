import { CreateUserDTO } from '../dto/create-user.dto';
import { ResponseUserDTO } from '../dto/response-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../models/user';

export const USER_SERVICE_KEY = Symbol('IUserService');

export interface IUserService {
  create(data: CreateUserDTO): Promise<ResponseUserDTO>;
  findByEmail(email: string): Promise<User>;
  getById(id: number): Promise<ResponseUserDTO>;
  findAll(): Promise<ResponseUserDTO[] | null>;
  update(id: number, data: UpdateUserDTO): Promise<ResponseUserDTO>;
  delete(id: number): Promise<void>;
}
  