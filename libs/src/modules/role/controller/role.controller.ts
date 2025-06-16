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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(@Inject(ROLE_REPOSITORY_KEY) private roleService: IRoleService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo rol' })
  @ApiBody({ type: CreateRoleDTO })
  @ApiResponse({
    status: 201,
    description: 'Rol creado correctamente',
    type: Role,
  })
  async create(@Body() createRoleDTO: CreateRoleDTO): Promise<Role> {
    const response = await this.roleService.create(createRoleDTO);
    return response;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Rol encontrado', type: Role })
  async getRoleById(@Param('id') id: number) {
    const user = await this.roleService.findById(+id);
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRoleDTO })
  @ApiResponse({ status: 200, description: 'Rol actualizado', type: Role })
  async updateRole(
    @Param('id') id: number,
    @Body() request: UpdateRoleDTO,
  ): Promise<Role | null> {
    return await this.roleService.update(id, request);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los roles' })
  @ApiResponse({ status: 200, description: 'Lista de roles', type: [Role] })
  async findAll() {
    return await this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Eliminar rol por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Rol eliminado correctamente' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.roleService.delete(+id);
  }
}
