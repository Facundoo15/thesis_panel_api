import { Provider } from '@nestjs/common';
import { FACULTY_REPOSITORY_KEY } from './faculty.repository';
import { TypeOrmProfessorRepository } from '../../professor/repository/typeorm-professor.repository';
import { FACULTY_SERVICE_KEY } from './faculty.service';
import { FacultyService } from '../service/faculty.service';
import { TypeORMFacultyRepository } from '../repository/typeorm-faculty.repository';

const facultyRepositoryProvider: Provider = {
  provide: FACULTY_REPOSITORY_KEY,
  useClass: TypeORMFacultyRepository,
};

const facultyServiceProvider: Provider = {
  provide: FACULTY_SERVICE_KEY,
  useClass: FacultyService,
};

export const facultyModuleProviders: Provider[] = [
  facultyRepositoryProvider,
  facultyServiceProvider,
  FacultyService,
];
