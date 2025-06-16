import { Provider } from '@nestjs/common';
import { ENDTHATPURPOSES_SERVICE_KEY } from './end-that-purposes.service';
import { EndThatPurposesService } from '../service/end-that-purposes.service';
import { ENDTHATPURPOSES_REPOSITORY_KEY } from './end-that-purposes.repository';
import { TypeOrmEndThatPurposesRepository } from '../repository/typeorm-endthatpurposes.repository';

const endThatPurposesRepositoryProvider: Provider = {
  provide: ENDTHATPURPOSES_REPOSITORY_KEY,
  useClass: TypeOrmEndThatPurposesRepository,
};

const endThatPurposesServiceProvider: Provider = {
  provide: ENDTHATPURPOSES_SERVICE_KEY,
  useClass: EndThatPurposesService,
};

export const endThatPurposesModuleProviders: Provider[] = [
  endThatPurposesRepositoryProvider,
  endThatPurposesServiceProvider,
  EndThatPurposesService,
];
