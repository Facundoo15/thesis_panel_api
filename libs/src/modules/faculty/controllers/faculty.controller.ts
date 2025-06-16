import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Inject,
} from '@nestjs/common';
import {
  FACULTY_SERVICE_KEY,
  IFacultyService,
} from '../contracts/faculty.service';
import { CreateFacultyDTO } from '../dto/create-faculty.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultyController {
  constructor(
    @Inject(FACULTY_SERVICE_KEY)
    private readonly _facultyService: IFacultyService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva facultad' })
  @ApiBody({ type: CreateFacultyDTO })
  @ApiResponse({ status: 201, description: 'Facultad creada correctamente' })
  async createFaculty(@Body() request: CreateFacultyDTO) {
    return await this._facultyService.create(request);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las facultades' })
  @ApiResponse({ status: 200, description: 'Lista de facultades' })
  async getAllFaculties() {
    return await this._facultyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una facultad por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la facultad' })
  @ApiResponse({ status: 200, description: 'Facultad encontrada' })
  async getFacultyById(@Param('id', ParseIntPipe) id: number) {
    return await this._facultyService.getById(id);
  }
}
