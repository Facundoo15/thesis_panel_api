import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Budget } from '../models/budget';

export const BUDGET_REPOSITORY_KEY = Symbol('IBudgetRepository');

export interface IBudgetRepository
  extends IReadableRepository<Budget>,
    IWriteableRepository<Budget> {
  findByName(name: string): Promise<Budget>;
}
