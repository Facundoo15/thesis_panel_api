import { Provider } from '@nestjs/common';
import { ACADEMICYEAR_REPOSITORY_KEY } from './academicy-year.repository';
import { TypeOrmAcademicYearRepository } from '../repository/typeorm-academicyear.repository';
import { PROFESSOR_SERVICE_KEY } from '../../professor/contracts/professor.service';
import { ACADEMICYEAR_SERVICE_KEY } from './academic-year.service';
import { AcademicYearService } from '../service/academic-year.service';

const academicYearRepositoryProvider: Provider = {
  provide: ACADEMICYEAR_REPOSITORY_KEY,
  useClass: TypeOrmAcademicYearRepository,
};

const academicYearServiceProvider: Provider = {
  provide: ACADEMICYEAR_SERVICE_KEY,
  useClass: AcademicYearService,
};

export const academicYearModuleProviders: Provider[] = [
  academicYearRepositoryProvider,
  academicYearServiceProvider,
  AcademicYearService,
];
