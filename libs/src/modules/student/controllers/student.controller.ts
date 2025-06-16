import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  IStudentService,
  STUDENT_SERVICE_KEY,
} from '../contracts/student.service';
import { IUserService } from '../../user/contracts/user.service';
import { CreateStudentDTO } from '../dto/create-student.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
@ApiTags('Estudiantes')
@Controller('students')
export class StudentController {
  constructor(
    @Inject(STUDENT_SERVICE_KEY)
    private readonly _studentService: IStudentService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo estudiante' })
  @ApiBody({ type: CreateStudentDTO })
  @ApiResponse({ status: 201, description: 'Estudiante creado correctamente' })
  async createStudent(@Body() request: CreateStudentDTO) {
    return await this._studentService.create(request);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Buscar estudiante por código' })
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado' })
  async findStudentByCode(@Param('code') code: string) {
    return await this._studentService.findByCodeStudent(code);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar estudiante por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Estudiante encontrado' })
  async findStudentById(@Param('id') id: number) {
    return await this._studentService.getById(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  async findAllStudents() {
    return await this._studentService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar estudiante por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado correctamente',
  })
  async deleteStudent(@Param('id') id: number) {
    return await this._studentService.deleteById(+id);
  }
}
