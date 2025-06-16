import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  IProfessorService,
  PROFESSOR_SERVICE_KEY,
} from '../contracts/professor.service';
import { CreateProfessorDTO } from '../dto/create-professor.dto';
import { UpdateProfessorDTO } from '../dto/update-professor.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorController {
  constructor(
    @Inject(PROFESSOR_SERVICE_KEY)
    private readonly _professorService: IProfessorService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear profesor' })
  @ApiBody({ type: CreateProfessorDTO })
  @ApiResponse({ status: 201, description: 'Profesor creado correctamente' })
  async createProfessor(@Body() request: CreateProfessorDTO) {
    return await this._professorService.create(request);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los profesores' })
  @ApiResponse({ status: 200, description: 'Lista de profesores' })
  async findAllProfessors() {
    return await this._professorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener profesor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Profesor encontrado por ID' })
  async getProfessorById(@Param('id', ParseIntPipe) id: number) {
    return await this._professorService.getById(id);
  }

  @Get('orcid/:orcid')
  @ApiOperation({ summary: 'Buscar profesor por ORCID' })
  @ApiParam({ name: 'orcid', type: String })
  @ApiResponse({ status: 200, description: 'Profesor encontrado por ORCID' })
  async getProfessorByOrcid(@Param('orcid') orcid: string) {
    return await this._professorService.getByOrcid(orcid);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Buscar profesor por código' })
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({ status: 200, description: 'Profesor encontrado por código' })
  async getProfessorByCode(@Param('code') code: string) {
    return await this._professorService.getByCode(code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar profesor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateProfessorDTO })
  @ApiResponse({ status: 200, description: 'Profesor actualizado' })
  async updateProfessor(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateProfessorDTO,
  ) {
    return await this._professorService.update(id, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar profesor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Profesor eliminado' })
  async deleteProfessor(@Param('id', ParseIntPipe) id: number) {
    return await this._professorService.delete(id);
  }
}
