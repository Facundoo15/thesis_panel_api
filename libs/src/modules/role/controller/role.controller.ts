import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IRoleService } from '../contracts/role.service';
import { ROLE_REPOSITORY_KEY } from '../contracts/role.repository';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto';
import { Role } from '../models';

@Controller('roles')
export class RoleController {
  constructor(@Inject(ROLE_REPOSITORY_KEY) private roleService: IRoleService) {}

  @Post()
  async create(@Body() createRoleDTO: CreateRoleDTO): Promise<Role> {
    const response = await this.roleService.create(createRoleDTO);
    return response;
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    const user = await this.roleService.findById(+id);
    return user;
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() request: UpdateRoleDTO,
  ): Promise<Role | null> {
    return await this.roleService.update(id, request);
  }
  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  async delete(@Param('id') id: number): Promise<void> {
    return await this.roleService.delete(+id);
  }
}
