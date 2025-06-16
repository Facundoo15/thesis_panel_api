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
  ISchoolService,
  SCHOOL_SERVICE_KEY,
} from '../contracts/school.service';
import { CreateSchoolDTO } from '../dto/create-school.dto';
import { ResponseSchoolDTO } from '../dto/response-school.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';


@ApiTags('Escuelas')
@Controller('schools')
export class SchoolController {
  constructor(
    @Inject(SCHOOL_SERVICE_KEY)
    private readonly _schoolService: ISchoolService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una escuela' })
  @ApiBody({ type: CreateSchoolDTO })
  @ApiResponse({
    status: 201,
    description: 'Escuela creada',
    type: ResponseSchoolDTO,
  })
  async create(@Body() data: CreateSchoolDTO): Promise<ResponseSchoolDTO> {
    return this._schoolService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener escuela por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Escuela encontrada',
    type: ResponseSchoolDTO,
  })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseSchoolDTO> {
    return this._schoolService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las escuelas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de escuelas',
    type: [ResponseSchoolDTO],
  })
  async findAll(): Promise<ResponseSchoolDTO[] | null> {
    return this._schoolService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar escuela por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Escuela eliminada' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._schoolService.delete(id);
  }
}
