import { Module } from '@nestjs/common';
import { budgetModuleProviders } from './contracts/providers';
import { BudgetController } from './controller/budget.controller';

@Module({
  imports: [],
  providers: [...budgetModuleProviders],
  controllers: [BudgetController],
  exports: [...budgetModuleProviders],
})
export class BudgetModule {}
