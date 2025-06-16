import { Provider } from '@nestjs/common';
import { RESEARCHDESIGN_REPOSITORY_KEY } from './research-design.repository';
import { TypeOrmResearchDesignRepository } from '../repository/typeorm-research-design.repository';
import { RESEARCHDESIGN_SERVICE_KEY } from './research-design.service';
import { ResearchDesignService } from '../service/research-design.service';

const researchDesignRepositoryProvider: Provider = {
  provide: RESEARCHDESIGN_REPOSITORY_KEY,
  useClass: TypeOrmResearchDesignRepository,
};

const researchDesignServiceProvider: Provider = {
  provide: RESEARCHDESIGN_SERVICE_KEY,
  useClass: ResearchDesignService,
};

export const researchDesignModuleProviders: Provider[] = [
  researchDesignRepositoryProvider,
  researchDesignServiceProvider,
  ResearchDesignService,
];
