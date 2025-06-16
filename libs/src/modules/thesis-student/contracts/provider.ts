import { Provider } from '@nestjs/common';
import { THESISSTUDENT_REPOSITORY_KEY } from './thesis-student.repository';
import { TypeOrmThesisStudentRepository } from '../repository/typeorm-thesis-student.repository';
import { THESISSTUDENT_SERVICE_KEY } from './thesis-student.service';
import { ThesisStudentService } from '../service/thesis-student.service';

const thesisStudentRepositoryProvider: Provider = {
  provide: THESISSTUDENT_REPOSITORY_KEY,
  useClass: TypeOrmThesisStudentRepository,
};

const thesisStudentServiceProvider: Provider = {
  provide: THESISSTUDENT_SERVICE_KEY,
  useClass: ThesisStudentService,
};

export const thesisStudentModuleProviders: Provider[] = [
  thesisStudentRepositoryProvider,
  thesisStudentServiceProvider,
  ThesisStudentService,
];
