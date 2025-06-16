import { Provider } from '@nestjs/common';
import { THESISCONTENT_REPOSITORY_KEY } from './thesis-content.repository';
import { TypeOrmThesisContentRepository } from '../repository/typeorm-thesis-content.repository';
import { THESISCONTENT_SERVICE_KEY } from './thesis-content.service';
import { ThesisContentService } from '../service/thesis-content.service';

const thesisContentRepositoryProvider: Provider = {
  provide: THESISCONTENT_REPOSITORY_KEY,
  useClass: TypeOrmThesisContentRepository,
};

const thesisContentServiceProvider: Provider = {
  provide: THESISCONTENT_SERVICE_KEY,
  useClass: ThesisContentService,
};

export const thesisContentModuleProviders: Provider[] = [
  thesisContentRepositoryProvider,
  thesisContentServiceProvider,
  ThesisContentService,
];
