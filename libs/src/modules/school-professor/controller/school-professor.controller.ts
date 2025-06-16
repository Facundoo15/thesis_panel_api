import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ISchoolProfessorService,
  SCHOOLPROFESSOR_SERVICE_KEY,
} from '../contracts/school-professor.service';
import { CreateSchoolProfessorDTO } from '../dto/create-school-professor.dto';
import { ResponseSchoolProfessorDTO } from '../dto/response-school-professor.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Escuela - Profesor')
@Controller('school-professor')
export class SchoolProfessorController {
  constructor(
    @Inject(SCHOOLPROFESSOR_SERVICE_KEY)
    private readonly _schoolProfessorService: ISchoolProfessorService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Relacionar profesor con escuela' })
  @ApiBody({ type: CreateSchoolProfessorDTO })
  @ApiResponse({
    status: 201,
    description: 'Relación creada',
    type: ResponseSchoolProfessorDTO,
  })
  create(
    @Body() dto: CreateSchoolProfessorDTO,
  ): Promise<ResponseSchoolProfessorDTO> {
    return this._schoolProfessorService.create(dto);
  }

  @Get('school/:schoolId')
  @ApiOperation({ summary: 'Listar profesores por escuela' })
  @ApiParam({ name: 'schoolId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Profesores encontrados',
    type: [ResponseSchoolProfessorDTO],
  })
  findProfessorsBySchool(
    @Param('schoolId', ParseIntPipe) schoolId: number,
  ): Promise<ResponseSchoolProfessorDTO[]> {
    return this._schoolProfessorService.findProfessorsBySchool(schoolId);
  }

  @Get('professor/:professorId')
  @ApiOperation({ summary: 'Listar escuelas por profesor' })
  @ApiParam({ name: 'professorId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Escuelas encontradas',
    type: [ResponseSchoolProfessorDTO],
  })
  findSchoolsByProfessor(
    @Param('professorId', ParseIntPipe) professorId: number,
  ): Promise<ResponseSchoolProfessorDTO[]> {
    return this._schoolProfessorService.findSchoolsByProfessors(professorId);
  }

  @Get(':schoolId/:professorId')
  @ApiOperation({ summary: 'Buscar relación por escuela y profesor' })
  @ApiParam({ name: 'schoolId', type: Number })
  @ApiParam({ name: 'professorId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada',
    type: ResponseSchoolProfessorDTO,
  })
  findBySchoolAndProfessor(
    @Param('schoolId', ParseIntPipe) schoolId: number,
    @Param('professorId', ParseIntPipe) professorId: number,
  ): Promise<ResponseSchoolProfessorDTO> {
    return this._schoolProfessorService.findBySchoolAndProfessor(
      schoolId,
      professorId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar relación escuela-profesor' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Relación eliminada' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._schoolProfessorService.delete(id);
  }
}
