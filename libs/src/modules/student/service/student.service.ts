import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUserService,
  USER_SERVICE_KEY,
} from '../../user/contracts/user.service';
import {
  IStudentRepository,
  STUDENT_REPOSITORY_KEY,
} from '../contracts/student.repository';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource, EntityManager } from 'typeorm';
import { CreateStudentDTO } from '../dto/create-student.dto';
import { IStudentService } from '../contracts/student.service';
import { ResponseStudentDTO } from '../dto/student-response.dto';
import { plainToInstance } from 'class-transformer';
import { Student } from '../models/student';

@Injectable()
export class StudentService implements IStudentService {
  private readonly entityManager: EntityManager;

  constructor(
    @Inject(STUDENT_REPOSITORY_KEY)
    private readonly _studentRepository: IStudentRepository,
    @Inject(USER_SERVICE_KEY)
    private readonly _userService: IUserService,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }

  async create(data: CreateStudentDTO): Promise<ResponseStudentDTO> {
    return this.entityManager.transaction(async () => {
      const validateCode = await this._studentRepository.findByCode(
        data.codStudent,
      );
      if (validateCode) throw new Error('El código del estudiante ya existe.');
      const validateDni = await this._studentRepository.findByDni(data.dni);
      if (validateDni) throw new Error('El DNI del estudiante ya existe.');

      const userResponse = await this._userService.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        roleId: data.roleId,
      });
      const studentData = {
        codStudent: data.codStudent,
        dni: data.dni,
        academicLevel: data.academicLevel,
        entrySemester: data.entrySemester,
        userId: userResponse.id,
      };

      const newStudent = plainToInstance(Student, studentData);
      const savedStudent = await this._studentRepository.create(newStudent);
      if (!savedStudent) throw new Error('Error al crear al estudiante');
      return plainToInstance(ResponseStudentDTO, savedStudent);
    });
  }

  async findByCodeStudent(code: string): Promise<ResponseStudentDTO> {
    const student = await this._studentRepository.findByCode(code);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return plainToInstance(ResponseStudentDTO, student, {
      excludeExtraneousValues: true,
    });
  }
  async getById(id: number): Promise<ResponseStudentDTO> {
    const student = await this._studentRepository.findById(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return plainToInstance(ResponseStudentDTO, student, {
      excludeExtraneousValues: true,
    });
  }
  async findAll(): Promise<ResponseStudentDTO[] | null> {
    return (await this._studentRepository.findAll()).map((s) =>
      plainToInstance(ResponseStudentDTO, s, { excludeExtraneousValues: true }),
    );
  }

  async deleteById(id: number): Promise<void> {
    return await this.entityManager.transaction(async () => {
      const student = await this._studentRepository.findById(id);
      if (!student) throw new Error('Error al encontrar al estudiante');
      await this._studentRepository.delete(student.id);
      await this._userService.delete(student.userId);
    });
  }
}
