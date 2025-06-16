import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Period } from '../models/period';

export const PERIOD_REPOSITORY_KEY = Symbol('IPeriodRepository');

export interface IPeriodRepository
  extends IReadableRepository<Period>,
    IWriteableRepository<Period> {
}
