import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ACADEMICYEAR_SERVICE_KEY,
  IAcademicYearService,
} from '../contracts/academic-year.service';
import { CreateAcademicYearDTO } from '../dto/create-academic-year.dto';
import { UpdateAcademicYearDTO } from '../dto/update-academic.year.dto';
import { ResponseAcademicYearDTO } from '../dto/response-academic-year.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('AcademicYear')
@Controller('academic-year')
export class AcademicYearController {
  constructor(
    @Inject(ACADEMICYEAR_SERVICE_KEY)
    private readonly _academicYearService: IAcademicYearService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo año académico' })
  @ApiBody({ type: CreateAcademicYearDTO })
  @ApiResponse({
    status: 201,
    description: 'Año académico creado exitosamente',
    type: ResponseAcademicYearDTO,
  })
  async create(
    @Body() data: CreateAcademicYearDTO,
  ): Promise<ResponseAcademicYearDTO> {
    return await this._academicYearService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un año académico existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateAcademicYearDTO })
  @ApiResponse({
    status: 200,
    description: 'Año académico actualizado',
    type: ResponseAcademicYearDTO,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAcademicYearDTO,
  ): Promise<ResponseAcademicYearDTO> {
    return await this._academicYearService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un año académico por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Año académico eliminado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._academicYearService.delete(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un año académico por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Detalle del año académico',
    type: ResponseAcademicYearDTO,
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseAcademicYearDTO> {
    return await this._academicYearService.getById(id);
  }
}
