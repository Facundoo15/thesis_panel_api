import { Provider } from '@nestjs/common';
import { PROFESSOR_REPOSITORY_KEY } from './professor.repository';
import { TypeOrmProfessorRepository } from '../repository/typeorm-professor.repository';
import { PROFESSOR_SERVICE_KEY } from './professor.service';
import { ProfessorService } from '../service/professor.service';

const professorRepositoryProvider: Provider = {
  provide: PROFESSOR_REPOSITORY_KEY,
  useClass: TypeOrmProfessorRepository,
};

const professorServiceProvider: Provider = {
  provide: PROFESSOR_SERVICE_KEY,
  useClass: ProfessorService,
};

export const professorModuleProviders: Provider[] = [
  professorRepositoryProvider,
  professorServiceProvider,
  ProfessorService,
];
