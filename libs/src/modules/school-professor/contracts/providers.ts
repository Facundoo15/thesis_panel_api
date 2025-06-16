import { Provider } from '@nestjs/common';
import { SCHOOLPROFESSOR_REPOSITORY_KEY } from './school-professor.repository';
import { TypeOrmSchoolProfessorRepository } from '../repository/typeorm-school-professor.repository';
import { SCHOOLPROFESSOR_SERVICE_KEY } from './school-professor.service';
import { SchoolProfessorService } from '../service/school-professor.service';

const schoolProfessorRepositoryProvider: Provider = {
  provide: SCHOOLPROFESSOR_REPOSITORY_KEY,
  useClass: TypeOrmSchoolProfessorRepository,
};

const schoolProfessorServiceProvider: Provider = {
  provide: SCHOOLPROFESSOR_SERVICE_KEY,
  useClass: SchoolProfessorService,
};

export const schoolProfessorModuleProviders: Provider[] = [
  schoolProfessorRepositoryProvider,
  schoolProfessorServiceProvider,
  SchoolProfessorService,
];
