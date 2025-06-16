import { ThesisBudget } from '@lib/src/modules/thesis-budget/models/thesis-budget';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ThesisBudgetSchema = new EntitySchema<ThesisBudget>({
  name: 'ThesisBudget',
  tableName: 'thesis_budget',
  columns: {
    ...BaseColumnSchemaPart,
    thesisId: {
      type: Number,
      name: 'thesis_id',
      nullable: false,
    },
    budgetId: {
      type: Number,
      name: 'budget_id',
      nullable: false,
    },
    amount: {
      type: 'float',
      nullable: false,
    },
    description: {
      type: String,
      name: 'description',
      nullable: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
      name: 'is_approved',
    },
  },
  relations: {
    thesis: {
      type: 'many-to-one',
      target: 'Thesis',
      joinColumn: {
        name: 'thesis_id',
      },
      onDelete: 'CASCADE',
    },
    budget: {
      type: 'many-to-one',
      target: 'Budget',
      joinColumn: {
        name: 'budget_id',
      },
      onDelete: 'CASCADE',
    },
  },
});
