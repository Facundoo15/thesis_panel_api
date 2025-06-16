import { BaseRepository } from '@lib/src/common/models/base.repository';
import { Course } from '../models/course';
import { ICourseRepository } from '../contracts/course.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { CourseSchema } from '@lib/src/database/typeorm/models/course.model';

export class TypeOrmCourseRepository
  extends BaseRepository<Course>
  implements ICourseRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, CourseSchema);
  }
  async getCoursesByPeriod(period: string): Promise<Course[]> {
    const [yearStr, periodStr] = period.split('-');
    const numYear = parseInt(yearStr);
    const periodNumber = parseInt(periodStr);

    if (isNaN(numYear) || isNaN(periodNumber)) {
      throw new NotFoundException(`Formato inválido del periodo: ${period}`);
    }

    const courses = await this._repository.find({
      relations: ['academicYear', 'period'],
      where: {
        academicYear: { numYear },
        period: { period: periodNumber },
      },
    });

    if (!courses || courses.length === 0) {
      throw new NotFoundException(
        `No se encontraron cursos para el periodo ${period}`,
      );
    }

    return courses;
  }
}
