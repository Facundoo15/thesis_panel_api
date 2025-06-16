import { Provider } from '@nestjs/common';
import { RESEARCHLINE_REPOSITORY_KEY } from './research-line.repository';
import { TypeOrmResearchLineRepository } from '../repository/typeorm-research-line.repository';
import { RESEARCHLINE_SERVICE_KEY } from './research-line.service';
import { ResearchLineService } from '../service/research-line.service';

const researchLineRepositoryProvider: Provider = {
  provide: RESEARCHLINE_REPOSITORY_KEY,
  useClass: TypeOrmResearchLineRepository,
};

const researchLineServiceProvider: Provider = {
  provide: RESEARCHLINE_SERVICE_KEY,
  useClass: ResearchLineService,
};

export const researchLineModuleProviders: Provider[] = [
  researchLineRepositoryProvider,
  researchLineServiceProvider,
  ResearchLineService,
];
