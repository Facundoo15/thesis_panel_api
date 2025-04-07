import { Inject } from '@nestjs/common';
import { IUserService } from '../contracts/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { ResponseUserDTO } from '../dto/response-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { User } from '../models/user';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import {
  IUserRepository,
  USER_REPOSITORY_KEY,
} from '../contracts/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserNotFoundException } from '../exceptions/user-not-found.error';
import { UserDuplicateEmail } from '../exceptions/user-duplicate-email.error';
import { UserNotEmail } from '../exceptions/user-not-email.error';
import {
  IRoleRepository,
  ROLE_REPOSITORY_KEY,
} from '../../role/contracts/role.repository';
import { RoleNotFoundException } from '../../role/exceptions/role-not-found.error';
import { CasbinRuleService } from '../../auth/service/casbin-rule.service';

export class UserService implements IUserService {
  private readonly entityManager: EntityManager;

  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private readonly _userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY_KEY)
    private readonly _roleRepository: IRoleRepository,
    @Inject(DATA_SOURCE) dataSource: DataSource,
    private readonly casbinService: CasbinRuleService,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }

  async create(data: CreateUserDTO): Promise<ResponseUserDTO> {
    return this.entityManager.transaction(async (entityManager) => {
      let existUser = await this._userRepository.findByEmail(data.email);
      if (existUser) throw new UserDuplicateEmail(data.email);

      let existRole = await this._roleRepository.findById(data.roleId);
      if (!existRole) throw new RoleNotFoundException(data.roleId);

      const hashPassword = await bcrypt.hash(data.password, 10);
      const newUser = plainToInstance(User, data);
      newUser.password = hashPassword;
      newUser.role = existRole;

      const savedUser = await this._userRepository.create(newUser);

      if (!savedUser.role) {
        throw new RoleNotFoundException(data.roleId);
      }

      await this.casbinService.addGroupingPolicy(
        savedUser.email,
        savedUser.role.roleName,
      );

      return plainToInstance(ResponseUserDTO, savedUser, {
        excludeExtraneousValues: true,
      });
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) throw new UserNotEmail(email);
    return user;
  }
  async getById(id: number): Promise<ResponseUserDTO> {
    const user = await this._userRepository.findById(id);
    if (!user) throw new UserNotFoundException(id);

    const role = await this._roleRepository.findById(user.roleId);
    if (!role) throw new RoleNotFoundException(user.roleId);

    user.role = role;

    return plainToInstance(ResponseUserDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ResponseUserDTO[]> {
    const users = await this._userRepository.findAll();
    if (!users || users.length === 0) return [];

    return users.map((user) =>
      plainToInstance(ResponseUserDTO, user, { excludeExtraneousValues: true }),
    );
  }

  async update(id: number, data: UpdateUserDTO): Promise<ResponseUserDTO> {
    return await this.entityManager.transaction(async (entityManager) => {
      const userSearch = await this._userRepository.findById(id);
      if (!userSearch) throw new UserNotFoundException(id);

      const { email, ...updateData } = data;

      const existEmail = email
        ? await this._userRepository.findByEmail(email)
        : null;
      if (existEmail && existEmail.id !== id)
        throw new UserDuplicateEmail(email);

      const updatedUser = plainToInstance(User, {
        ...userSearch,
        ...updateData,
      });
      const response = await this._userRepository.update(id, updatedUser);
      return plainToInstance(ResponseUserDTO, response, {
        excludeExtraneousValues: true,
      });
    });
  }

  async delete(id: number): Promise<void> {
    return await this.entityManager.transaction(async (entityManager) => {
      const user = await this._userRepository.findById(id);
      if (!user) throw new UserNotFoundException(id);
      this._userRepository.delete(id);
    });
  }
}
