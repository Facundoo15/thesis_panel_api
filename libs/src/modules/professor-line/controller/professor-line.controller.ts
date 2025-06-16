import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Inject,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  IProfessorLineService,
  PROFESSORLINE_SERVICE_KEY,
} from '../contracts/professor-line.service';
import { CreateProfessorLineDTO } from '../dto/create-professor-line.dto';
import { ResponseProfessorLineDTO } from '../dto/response-professor-line.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { ResponseProfessorDTO } from '../../professor/dto/response-professor.dto';

@ApiTags('Professor Line')
@Controller('professor-line')
export class ProfessorLineController {
  constructor(
    @Inject(PROFESSORLINE_SERVICE_KEY)
    private readonly _professorLineService: IProfessorLineService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las líneas de profesores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de líneas de profesores',
    type: [ResponseProfessorLineDTO],
  })
  async findAll(): Promise<ResponseProfessorLineDTO[]> {
    return this._professorLineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener línea de profesor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Línea de profesor encontrada',
    type: ResponseProfessorLineDTO,
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseProfessorLineDTO> {
    return this._professorLineService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear línea de profesor' })
  @ApiBody({ type: CreateProfessorLineDTO })
  @ApiResponse({
    status: 201,
    description: 'Línea de profesor creada',
    type: ResponseProfessorLineDTO,
  })
  async create(
    @Body() data: CreateProfessorLineDTO,
  ): Promise<ResponseProfessorLineDTO> {
    return this._professorLineService.create(data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar línea de profesor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Línea eliminada correctamente' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._professorLineService.delete(id);
  }

  @Get('line/:lineId/professors')
  @ApiOperation({
    summary: 'Listar profesores asociados a una línea específica',
  })
  @ApiParam({ name: 'lineId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Profesores asociados a la línea',
    type: [ResponseProfessorDTO],
  })
  async findProfessorsByLine(
    @Param('lineId', ParseIntPipe) lineId: number,
  ): Promise<ResponseProfessorDTO[]> {
    return this._professorLineService.findProfessorsByLine(lineId);
  }
}
