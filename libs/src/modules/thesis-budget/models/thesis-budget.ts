import { BaseModel } from '@lib/src/common/models';
import { Budget } from '../../budget/models/budget';
import { Thesis } from '../../thesis/models/thesis';

export class ThesisBudget extends BaseModel {
  id: number;
  thesisId: number;
  budgetId: number;
  amount: number;

  thesis: Thesis;
  budget: Budget;

  description?: string;
  isApproved?: boolean;
}
