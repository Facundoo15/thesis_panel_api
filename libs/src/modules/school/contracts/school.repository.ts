import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { School } from '../models/school';

export const SCHOOL_REPOSITORY_KEY = Symbol('ISchoolRepository');

export interface ISchoolRepository
  extends IReadableRepository<School>,
    IWriteableRepository<School> {
  findByName(name: string): Promise<School>;
}
