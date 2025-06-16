import { Module } from '@nestjs/common';
import { ThesisModule } from '../thesis/thesis.module';
import { BudgetModule } from '../budget/budget.module';
import { thesisBudgetModuleProviders } from './contracts/provider';
import { ThesisBudgetController } from './controller/thesis-budget.controller';

@Module({
  imports: [ThesisModule, BudgetModule],
  providers: [...thesisBudgetModuleProviders],
  controllers: [ThesisBudgetController],
  exports: [...thesisBudgetModuleProviders],
})
export class ThesisBudgetModule {}
