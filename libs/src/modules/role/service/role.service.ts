import { IRoleService } from '../contracts/role.service';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto';
import { Role } from '../models';
import {
  IRoleRepository,
  ROLE_REPOSITORY_KEY,
} from '../contracts/role.repository';
import { Inject } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export class RoleService implements IRoleService {
  constructor(
    @Inject(ROLE_REPOSITORY_KEY)
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async create(data: CreateRoleDTO): Promise<any> {
    const newRole = plainToInstance(Role, data);
    return await this._roleRepository.create(newRole);
  }
  async update(id: number, data: UpdateRoleDTO): Promise<Role | null> {
    const updatedRole = plainToInstance(Role, data);
    return await this._roleRepository.update(id, updatedRole);
  }
  async findById(id: number): Promise<Role | null> {
    const role = await this._roleRepository.findById(id);
    return role ? plainToInstance(Role, role) : null;
  }
  async findAll(): Promise<Role[]> {
    const roles = await this._roleRepository.findAll();
    return roles.map((role) => plainToInstance(Role, role));
  }
  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
