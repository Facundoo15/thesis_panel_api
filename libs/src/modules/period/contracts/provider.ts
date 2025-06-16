import { Provider } from '@nestjs/common';
import { PERIOD_REPOSITORY_KEY } from './period.repository';
import { TypeOrmPeriodRepository } from '../repository/typeorm-period.repository';
import { PERIOD_SERVICE_KEY } from './period.service';
import { PeriodService } from '../service/period.service';

const periodRepositoryProvider: Provider = {
  provide: PERIOD_REPOSITORY_KEY,
  useClass: TypeOrmPeriodRepository,
};

const periodServiceProvider: Provider = {
  provide: PERIOD_SERVICE_KEY,
  useClass: PeriodService,
};

export const periodModuleProviders: Provider[] = [
  periodRepositoryProvider,
  periodServiceProvider,
  PeriodService,
];
