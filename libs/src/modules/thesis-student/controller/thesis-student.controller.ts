import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import {
  IThesisStudentService,
  THESISSTUDENT_SERVICE_KEY,
} from '../contracts/thesis-student.service';
import { CreateThesisStudentDTO } from '../dto/create-thesis-student.dto';
import { UpdateThesisStudentDTO } from '../dto/update-thesis-student.dto';
import { ResponseThesisStudentDTO } from '../dto/response-thesis-student.dto';

@ApiTags('Estudiantes de Tesis')
@Controller('thesis-student')
export class ThesisStudentController {
  constructor(
    @Inject(THESISSTUDENT_SERVICE_KEY)
    private readonly _thesisStudentService: IThesisStudentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Asignar estudiante a una tesis' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante asignado exitosamente',
    type: ResponseThesisStudentDTO,
  })
  async create(
    @Body() data: CreateThesisStudentDTO,
  ): Promise<ResponseThesisStudentDTO> {
    return this._thesisStudentService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de asignación de estudiante' })
  @ApiParam({ name: 'id', description: 'ID de la relación estudiante-tesis' })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada correctamente',
    type: ResponseThesisStudentDTO,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateThesisStudentDTO,
  ): Promise<ResponseThesisStudentDTO> {
    return this._thesisStudentService.update(id, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener relación estudiante-tesis por ID' })
  @ApiParam({ name: 'id', description: 'ID de la relación' })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada',
    type: ResponseThesisStudentDTO,
  })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseThesisStudentDTO> {
    return this._thesisStudentService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las relaciones estudiante-tesis' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de relaciones',
    type: [ResponseThesisStudentDTO],
  })
  async findAll(): Promise<ResponseThesisStudentDTO[]> {
    return this._thesisStudentService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar relación estudiante-tesis' })
  @ApiParam({ name: 'id', description: 'ID de la relación' })
  @ApiResponse({ status: 204, description: 'Relación eliminada exitosamente' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._thesisStudentService.delete(id);
  }
}
