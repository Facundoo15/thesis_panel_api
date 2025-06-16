import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { AcademicYear } from '../models/academic-year';

export const ACADEMICYEAR_REPOSITORY_KEY = Symbol('IAcademicYearRepository');
export interface IAcademicYearRepository
  extends IReadableRepository<AcademicYear>,
    IWriteableRepository<AcademicYear> {
  getByYear(year: number): Promise<AcademicYear | null>;
}
