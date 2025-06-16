import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { IUserService, USER_SERVICE_KEY } from '../contracts/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { ResponseUserDTO } from '../dto/response-user.dto'; // asumo que tienes uno, si no, te lo armo

@ApiTags('Usuarios')
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_KEY)
    private readonly _userService: IUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: ResponseUserDTO,
  })
  async createUser(@Body() request: CreateUserDTO) {
    return await this._userService.create(request);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: ResponseUserDTO,
  })
  async getUserById(@Param('id') id: number) {
    return await this._userService.getById(+id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Buscar usuario por correo electrónico' })
  @ApiParam({ name: 'email', description: 'Correo electrónico del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado por email',
    type: ResponseUserDTO,
  })
  async getUserByEmail(@Param('email') email: string) {
    return await this._userService.findByEmail(email);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los usuarios',
    type: [ResponseUserDTO],
  })
  async getAllUsers() {
    return await this._userService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
    type: ResponseUserDTO,
  })
  async updateUser(@Param('id') id: number, @Body() request: UpdateUserDTO) {
    return await this._userService.update(+id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario a eliminar' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  async deleteUser(@Param('id') id: number) {
    return await this._userService.delete(id);
  }
}
