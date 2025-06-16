import { Provider } from '@nestjs/common';
import { COURSE_REPOSITORY_KEY } from './course.repository';
import { TypeOrmCourseRepository } from '../repository/typeorm-course.repository';
import { COURSE_SERVICE_KEY } from './course.service';
import { CourseService } from '../service/course.service';

const courseRepositoryProvider: Provider = {
  provide: COURSE_REPOSITORY_KEY,
  useClass: TypeOrmCourseRepository,
};

const courseServiceProvider: Provider = {
  provide: COURSE_SERVICE_KEY,
  useClass: CourseService,
};

export const courseModuleProviders: Provider[] = [
  courseRepositoryProvider,
  courseServiceProvider,
  CourseService,
];


