import { Provider } from '@nestjs/common';
import { THESISBUDGET_REPOSITORY_KEY } from './thesis-budget.repository';
import { TypeOrmThesisBudgetRepository } from '../repository/typeorm-thesis-budget.repository';
import { THESISBUDGET_SERVICE_KEY } from './thesis-budget.service';
import { ThesisBudgetService } from '../service/thesis-budget.service';

const thesisBudgetRepositoryProvider: Provider = {
  provide: THESISBUDGET_REPOSITORY_KEY,
  useClass: TypeOrmThesisBudgetRepository,
};

const thesisBudgetServiceProvider: Provider = {
  provide: THESISBUDGET_SERVICE_KEY,
  useClass: ThesisBudgetService,
};

export const thesisBudgetModuleProviders: Provider[] = [
  thesisBudgetRepositoryProvider,
  thesisBudgetServiceProvider,
  ThesisBudgetService,
];
