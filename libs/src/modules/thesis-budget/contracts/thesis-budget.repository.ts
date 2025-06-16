import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ThesisBudget } from '../models/thesis-budget';

export const THESISBUDGET_REPOSITORY_KEY = Symbol('IThesisBudgetRepository');

export interface IThesisBudgetRepository
  extends IWriteableRepository<ThesisBudget>,
    IReadableRepository<ThesisBudget> {
  findByThesisId(thesisId: number): Promise<ThesisBudget[]>;

  findByThesisAndBudget(
    thesisId: number,
    budgetId: number,
  ): Promise<ThesisBudget | null>;

  updateApprovalStatus(id: number, isApproved: boolean): Promise<void>;

  getTotalAmountByThesisId(thesisId: number): Promise<number>;

  deleteByThesisId(thesisId: number): Promise<void>;
}
