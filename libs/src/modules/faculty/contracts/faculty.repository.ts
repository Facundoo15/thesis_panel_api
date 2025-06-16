import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Faculty } from '../models/faculty';

export const FACULTY_REPOSITORY_KEY = Symbol('IFacultyRepository');
export interface IFacultyRepository
  extends IReadableRepository<Faculty>,
    IWriteableRepository<Faculty> {
  findAllByState(state: boolean): Promise<Faculty[] | null>;
  getByName(name: string): Promise<Faculty | null>;
}
