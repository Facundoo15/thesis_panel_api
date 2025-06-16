import { DataSource, EntityManager } from 'typeorm';
import { ICourseService } from '../contracts/course.service';
import { CreateCourseDTO } from '../dto/create-course.dto';
import { ResponseCourseDTO } from '../dto/response-course.dto';
import { UpdateCourseDTO } from '../dto/update-course.dto';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  COURSE_REPOSITORY_KEY,
  ICourseRepository,
} from '../contracts/course.repository';
import {
  ACADEMICYEAR_SERVICE_KEY,
  IAcademicYearService,
} from '../../academic-year/contracts/academic-year.service';
import {
  IPeriodService,
  PERIOD_SERVICE_KEY,
} from '../../period/contracts/period.service';
import {
  ISchoolService,
  SCHOOL_SERVICE_KEY,
} from '../../school/contracts/school.service';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { plainToInstance } from 'class-transformer';
import { Course } from '../models/course';

export class CourseService implements ICourseService {
  private readonly entityManager: EntityManager;

  constructor(
    @Inject(COURSE_REPOSITORY_KEY)
    private readonly _courseRepository: ICourseRepository,
    @Inject(ACADEMICYEAR_SERVICE_KEY)
    private readonly _academicYearService: IAcademicYearService,
    @Inject(PERIOD_SERVICE_KEY) private readonly _periodService: IPeriodService,
    @Inject(SCHOOL_SERVICE_KEY) private readonly _schoolService: ISchoolService,
    @Inject(DATA_SOURCE) dataSource: DataSource,
  ) {
    this.entityManager = dataSource.createEntityManager();
  }
  async create(data: CreateCourseDTO): Promise<ResponseCourseDTO> {
    return this.entityManager.transaction(async () => {
      const [academicYear, period, school] = await Promise.all([
        this._academicYearService.getById(data.academicYearId),
        this._periodService.findById(data.periodId),
        this._schoolService.getById(data.schoolId),
      ]);

      if (period.academicYearId !== academicYear.id) {
        throw new Error(
          'El periodo seleccionado no pertenece al año académico indicado.',
        );
      }

      const courseData = plainToInstance(Course, {
        ...data,
        academicYearId: academicYear.id,
        periodId: period.id,
        schoolId: school.id,
      });

      const saved = await this._courseRepository.create(courseData);
      const response = await this._courseRepository.findById(saved.id);

      return plainToInstance(ResponseCourseDTO, response);
    });
  }

  async update(id: number, data: UpdateCourseDTO): Promise<ResponseCourseDTO> {
    return this.entityManager.transaction(async () => {
      const existing = await this._courseRepository.findById(id);
      if (!existing) throw new NotFoundException('Curso no encontrado');

      const [academicYear, period, school] = await Promise.all([
        this._academicYearService.getById(data.academicYearId),
        this._periodService.findById(data.periodId),
        this._schoolService.getById(data.schoolId),
      ]);

      if (period.academicYearId !== academicYear.id) {
        throw new BadRequestException(
          'El periodo no pertenece al año académico proporcionado.',
        );
      }

      const updatedCourse = plainToInstance(Course, {
        ...existing,
        ...data,
        academicYearId: academicYear.id,
        periodId: period.id,
        schoolId: school.id,
      });

      const saved = await this._courseRepository.update(id, updatedCourse);
      const result = await this._courseRepository.findById(saved.id);

      return plainToInstance(ResponseCourseDTO, result, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getById(id: number): Promise<ResponseCourseDTO | null> {
    const course = await this._courseRepository.findById(id);
    if (!course) return null;

    return plainToInstance(ResponseCourseDTO, course, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(): Promise<ResponseCourseDTO[] | null> {
    const result = await this._courseRepository.findAll();
    return result.map((course) =>
      plainToInstance(ResponseCourseDTO, course, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async delete(id: number): Promise<void> {
    const course = await this._courseRepository.findById(id);
    if (!course)
      throw new NotFoundException('No se encontró el curso a eliminar');

    await this._courseRepository.delete(id);
  }
}
