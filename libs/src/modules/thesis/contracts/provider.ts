import { Provider } from '@nestjs/common';
import { THESIS_REPOSITORY_KEY } from './thesis.repository';
import { TypeOrmThesisRepository } from '../repository/typeorm-thesis.repository';
import { THESIS_SERVICE_KEY } from './thesis.service';
import { ThesisService } from '../service/thesis.service';

const thesisRepositoryProvider: Provider = {
  provide: THESIS_REPOSITORY_KEY,
  useClass: TypeOrmThesisRepository,
};

const thesisServiceProvider: Provider = {
  provide: THESIS_SERVICE_KEY,
  useClass: ThesisService,
};

export const thesisModuleProviders: Provider[] = [
  thesisRepositoryProvider,
  thesisServiceProvider,
  ThesisService,
];
