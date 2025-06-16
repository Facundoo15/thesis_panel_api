import { Provider } from '@nestjs/common';
import { SCHOOL_REPOSITORY_KEY } from './school.repository';
import { TypeOrmSchoolRepository } from '../repository/typeorm-school.repository';
import { SCHOOL_SERVICE_KEY } from './school.service';
import { SchoolService } from '../service/school.service';

const schoolRepositoryProvider: Provider = {
  provide: SCHOOL_REPOSITORY_KEY,
  useClass: TypeOrmSchoolRepository,
};

const schoolServiceProvider: Provider = {
  provide: SCHOOL_SERVICE_KEY,
  useClass: SchoolService,
};

export const schoolModuleProviders: Provider[] = [
  schoolRepositoryProvider,
  schoolServiceProvider,
  SchoolService,
];
