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
import {
  ICourseService,
  COURSE_SERVICE_KEY,
} from '../contracts/course.service';
import { CreateCourseDTO } from '../dto/create-course.dto';
import { UpdateCourseDTO } from '../dto/update-course.dto';
import { ResponseCourseDTO } from '../dto/response-course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(
    @Inject(COURSE_SERVICE_KEY)
    private readonly _courseService: ICourseService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiBody({ type: CreateCourseDTO })
  @ApiResponse({
    status: 201,
    description: 'Curso creado exitosamente',
    type: ResponseCourseDTO,
  })
  async createCourse(
    @Body() data: CreateCourseDTO,
  ): Promise<ResponseCourseDTO> {
    return await this._courseService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un curso existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateCourseDTO })
  @ApiResponse({
    status: 200,
    description: 'Curso actualizado exitosamente',
    type: ResponseCourseDTO,
  })
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCourseDTO,
  ): Promise<ResponseCourseDTO> {
    return await this._courseService.update(id, data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({
    status: 200,
    description: 'Listado de cursos',
    type: [ResponseCourseDTO],
  })
  async getAllCourses(): Promise<ResponseCourseDTO[]> {
    return await this._courseService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado',
    type: ResponseCourseDTO,
  })
  async getCourseById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseCourseDTO | null> {
    return await this._courseService.getById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un curso por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Curso eliminado' })
  async deleteCourse(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._courseService.delete(id);
  }
}
