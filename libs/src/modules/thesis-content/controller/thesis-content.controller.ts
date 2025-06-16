import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateThesisContentDTO } from '../dto/create-thesis-content.dto';
import { ContentReviewStatus } from '../models/thesis-review-status';
import { ThesisSection } from '../models/thesis-section';
import { ResponseThesisContentDTO } from '../dto/response-thesis-content.dto';
import {
  IThesisContentService,
  THESISCONTENT_SERVICE_KEY,
} from '../contracts/thesis-content.service';

@ApiTags('Contenido de Tesis')
@Controller('thesis-content')
export class ThesisContentController {
  constructor(
    @Inject(THESISCONTENT_SERVICE_KEY)
    private readonly _thesisContentService: IThesisContentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear o actualizar contenido de tesis' })
  @ApiResponse({ status: 201, description: 'Contenido creado o actualizado', type: ResponseThesisContentDTO })
  create(
    @Body() dto: CreateThesisContentDTO,
  ): Promise<ResponseThesisContentDTO> {
    return this._thesisContentService.createOrUpdate(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contenidos de tesis' })
  @ApiResponse({ status: 200, description: 'Lista de contenidos', type: [ResponseThesisContentDTO] })
  findAll(): Promise<ResponseThesisContentDTO[]> {
    return this._thesisContentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener contenido por ID' })
  @ApiParam({ name: 'id', description: 'ID del contenido' })
  @ApiResponse({ status: 200, description: 'Contenido encontrado', type: ResponseThesisContentDTO })
  findById(@Param('id') id: number): Promise<ResponseThesisContentDTO> {
    return this._thesisContentService.findById(+id);
  }

  @Get('by-thesis/:thesisId')
  @ApiOperation({ summary: 'Obtener contenidos por ID de tesis' })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiResponse({ status: 200, description: 'Contenidos encontrados', type: [ResponseThesisContentDTO] })
  findByThesis(
    @Param('thesisId') thesisId: number,
  ): Promise<ResponseThesisContentDTO[]> {
    return this._thesisContentService.findByThesisId(+thesisId);
  }

  @Get('by-thesis-and-section')
  @ApiOperation({ summary: 'Obtener contenido por tesis y sección' })
  @ApiQuery({ name: 'thesisId', description: 'ID de la tesis', type: Number })
  @ApiQuery({ name: 'section', description: 'Sección de la tesis', enum: ThesisSection })
  @ApiResponse({ status: 200, description: 'Contenido encontrado', type: ResponseThesisContentDTO })
  findByThesisAndSection(
    @Query('thesisId') thesisId: number,
    @Query('section') section: ThesisSection,
  ): Promise<ResponseThesisContentDTO | null> {
    return this._thesisContentService.findByThesisAndSection(+thesisId, section);
  }

  @Get('pending/:thesisId')
  @ApiOperation({ summary: 'Obtener secciones pendientes de revisión de una tesis' })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiResponse({ status: 200, description: 'Secciones pendientes', type: [ResponseThesisContentDTO] })
  findPending(
    @Param('thesisId') thesisId: number,
  ): Promise<ResponseThesisContentDTO[]> {
    return this._thesisContentService.findPendingByThesis(+thesisId);
  }

  @Patch(':id/review-status')
  @ApiOperation({ summary: 'Actualizar estado de revisión de un contenido' })
  @ApiParam({ name: 'id', description: 'ID del contenido' })
  @ApiQuery({ name: 'status', description: 'Nuevo estado de revisión', enum: ContentReviewStatus })
  @ApiResponse({ status: 200, description: 'Estado de revisión actualizado' })
  updateReviewStatus(
    @Param('id') id: number,
    @Query('status') status: ContentReviewStatus,
  ): Promise<void> {
    return this._thesisContentService.updateReviewStatus(+id, status);
  }

  @Patch(':id/increment-version')
  @ApiOperation({ summary: 'Incrementar versión del contenido' })
  @ApiParam({ name: 'id', description: 'ID del contenido' })
  @ApiResponse({ status: 200, description: 'Versión incrementada' })
  incrementVersion(@Param('id') id: number): Promise<void> {
    return this._thesisContentService.incrementVersion(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar contenido de tesis' })
  @ApiParam({ name: 'id', description: 'ID del contenido' })
  @ApiResponse({ status: 204, description: 'Contenido eliminado' })
  delete(@Param('id') id: number): Promise<void> {
    return this._thesisContentService.delete(+id);
  }
}
