import { Provider } from '@nestjs/common';
import { PROFESSORLINE_REPOSITORY_KEY } from './professor-line.repository';
import { TypeOrmProfessorLineRepository } from '../repository/typeorm-professor.line.repository';
import { PROFESSORLINE_SERVICE_KEY } from './professor-line.service';
import { ProfessorLineService } from '../service/professor-line.service';

const professorLineRepositoryProvider: Provider = {
  provide: PROFESSORLINE_REPOSITORY_KEY,
  useClass: TypeOrmProfessorLineRepository,
};

const professorLineServiceProvider: Provider = {
  provide: PROFESSORLINE_SERVICE_KEY,
  useClass: ProfessorLineService,
};

export const professorLineModuleProviders: Provider[] = [
  professorLineRepositoryProvider,
  professorLineServiceProvider,
  ProfessorLineService,
];
