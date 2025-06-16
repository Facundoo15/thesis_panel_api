import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { EndThatPurposes } from '../models/end-that-purposes';

export const ENDTHATPURPOSES_REPOSITORY_KEY = Symbol(
  'IEndThatPurposesRepository',
);

export interface IEndThatPurposesRepository
  extends IWriteableRepository<EndThatPurposes>,
    IReadableRepository<EndThatPurposes> {
  findByName(name: string): Promise<EndThatPurposes>;
  findByCode(code: string): Promise<EndThatPurposes>;
}
