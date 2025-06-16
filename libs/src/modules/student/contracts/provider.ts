import { Provider } from '@nestjs/common';
import { STUDENT_REPOSITORY_KEY } from './student.repository';
import { TypeOrmStudentRepository } from '../repository/typeorm-student.repository';

import { StudentService } from '../service/student.service';
import { STUDENT_SERVICE_KEY } from './student.service';

const studentRepositoryProvider: Provider = {
  provide: STUDENT_REPOSITORY_KEY,
  useClass: TypeOrmStudentRepository,
};

const studentServiceProvider: Provider = {
  provide: STUDENT_SERVICE_KEY,
  useClass: StudentService,
};

export const studentModuleProviders: Provider[] = [
  studentRepositoryProvider,
  studentServiceProvider,
  StudentService,
];
