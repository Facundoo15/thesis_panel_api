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
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  IThesisService,
  THESIS_SERVICE_KEY,
} from '../contracts/thesis.service';
import { CreateThesisDTO } from '../dto/create-thesis.dto';
import { UpdateThesisDTO } from '../dto/update-thesis.dto';
import { ThesisStatus } from '../models/thesis';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
@ApiTags('Tesis')
@Controller('thesis')
export class ThesisController {
  constructor(
    @Inject(THESIS_SERVICE_KEY)
    private readonly _thesisService: IThesisService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tesis' })
  @ApiBody({ type: CreateThesisDTO })
  @ApiResponse({ status: 201, description: 'Tesis creada correctamente' })
  async create(@Body() dto: CreateThesisDTO) {
    return this._thesisService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las tesis' })
  @ApiResponse({ status: 200, description: 'Lista de tesis' })
  async findAll() {
    return this._thesisService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tesis por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis encontrada' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this._thesisService.findById(id);
  }

  @Get('search/title')
  @ApiOperation({ summary: 'Buscar tesis por título' })
  @ApiQuery({ name: 'title', type: String, required: true })
  @ApiResponse({ status: 200, description: 'Tesis encontradas' })
  async findByTitle(@Query('title') title: string) {
    if (!title) {
      throw new BadRequestException('El título es requerido');
    }
    return this._thesisService.findByTitle(title);
  }

  @Get('search/status')
  @ApiOperation({ summary: 'Buscar tesis por estado' })
  @ApiQuery({ name: 'status', enum: ThesisStatus, required: true })
  @ApiResponse({ status: 200, description: 'Tesis encontradas' })
  async findByStatus(@Query('status') status: ThesisStatus) {
    if (!status) {
      throw new BadRequestException('El estado es requerido');
    }
    return this._thesisService.findByStatus(status);
  }

  @Get('search/professor/:professorId')
  @ApiOperation({ summary: 'Buscar tesis por profesor' })
  @ApiParam({ name: 'professorId', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis encontradas' })
  async findByProfessor(
    @Param('professorId', ParseIntPipe) professorId: number,
  ) {
    return this._thesisService.findByProfessorId(professorId);
  }

  @Get('search/design/:designId')
  @ApiOperation({ summary: 'Buscar tesis por diseño metodológico' })
  @ApiParam({ name: 'designId', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis encontradas' })
  async findByResearchDesign(
    @Param('designId', ParseIntPipe) designId: number,
  ) {
    return this._thesisService.findByResearchDesignId(designId);
  }

  @Get('search/end-purpose/:purposeId')
  @ApiOperation({ summary: 'Buscar tesis por finalidad' })
  @ApiParam({ name: 'purposeId', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis encontradas' })
  async findByEndPurpose(@Param('purposeId', ParseIntPipe) purposeId: number) {
    return this._thesisService.findByEndThatPurposesId(purposeId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar tesis' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateThesisDTO })
  @ApiResponse({ status: 200, description: 'Tesis actualizada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateThesisDTO,
  ) {
    return this._thesisService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar tesis' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis eliminada' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this._thesisService.delete(id);
    return { message: 'Tesis eliminada correctamente' };
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Aprobar tesis con nota final' })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'grade', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis aprobada' })
  async approveThesis(
    @Param('id', ParseIntPipe) id: number,
    @Query('grade') grade: number,
  ) {
    const gradeNumber = Number(grade);
    if (isNaN(gradeNumber)) {
      throw new BadRequestException('La nota debe ser un número válido');
    }
    return this._thesisService.approveThesis(id, gradeNumber);
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Rechazar tesis' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Tesis rechazada' })
  async rejectThesis(@Param('id', ParseIntPipe) id: number) {
    return this._thesisService.rejectThesis(id);
  }
}
