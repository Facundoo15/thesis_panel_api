import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { Budget } from '@lib/src/modules/budget/models/budget';

export const BudgetSchema = new EntitySchema<Budget>({
  name: 'Budget',
  tableName: 'budgets',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      nullable: false,
    },
  },
});
