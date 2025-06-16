import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Inject,
} from '@nestjs/common';
import {
  RESEARCHLINE_SERVICE_KEY,
  IResearchLineService,
} from '../contracts/research-line.service';
import { CreateResearchLineDTO } from '../dto/create-research-line.dto';
import { UpdateResearchLineDTO } from '../dto/update-research-line.dto';
import { ResponseResearchLineDTO } from '../dto/response-research-line.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Research Line')
@Controller('research-lines')
export class ResearchLineController {
  constructor(
    @Inject(RESEARCHLINE_SERVICE_KEY)
    private readonly _researchLineService: IResearchLineService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear línea de investigación' })
  @ApiBody({ type: CreateResearchLineDTO })
  @ApiResponse({
    status: 201,
    description: 'Línea de investigación creada',
    type: ResponseResearchLineDTO,
  })
  async create(
    @Body() data: CreateResearchLineDTO,
  ): Promise<ResponseResearchLineDTO> {
    return this._researchLineService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las líneas de investigación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de líneas de investigación',
    type: [ResponseResearchLineDTO],
  })
  async findAll(): Promise<ResponseResearchLineDTO[]> {
    return this._researchLineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar línea de investigación por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Línea de investigación encontrada',
    type: ResponseResearchLineDTO,
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseResearchLineDTO> {
    return this._researchLineService.getById(id);
  }

  @Get('by-code/:code')
  @ApiOperation({ summary: 'Buscar línea de investigación por código' })
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    description: 'Línea de investigación encontrada por código',
    type: ResponseResearchLineDTO,
  })
  async getByCode(
    @Param('code') code: string,
  ): Promise<ResponseResearchLineDTO> {
    return this._researchLineService.getByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar línea de investigación' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateResearchLineDTO })
  @ApiResponse({
    status: 200,
    description: 'Línea de investigación actualizada',
    type: ResponseResearchLineDTO,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateResearchLineDTO,
  ): Promise<ResponseResearchLineDTO> {
    return this._researchLineService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar línea de investigación por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Línea eliminada correctamente' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._researchLineService.delete(id);
  }
}
