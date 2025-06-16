import { Provider } from '@nestjs/common';
import { BUDGET_REPOSITORY_KEY } from './budget.repository';
import { TypeOrmBudgetRepository } from '../repository/typeorm-budget.repository';
import { BUDGET_SERVICE_KEY } from './budget.service';
import { BudgetService } from '../service/budget.service';

const budgetRepositoryProvider: Provider = {
  provide: BUDGET_REPOSITORY_KEY,
  useClass: TypeOrmBudgetRepository,
};

const budgetServiceProvider: Provider = {
  provide: BUDGET_SERVICE_KEY,
  useClass: BudgetService,
};

export const budgetModuleProviders: Provider[] = [
  budgetRepositoryProvider,
  budgetServiceProvider,
  BudgetService,
];
