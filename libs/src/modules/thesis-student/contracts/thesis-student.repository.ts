import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ThesisStudent } from '../models/thesis-student';

export const THESISSTUDENT_REPOSITORY_KEY = Symbol('IThesisStudentRepository');

export interface IThesisStudentRepository
  extends IWriteableRepository<ThesisStudent>,
    IReadableRepository<ThesisStudent> {
  findByStudentWithThesis(studentId: number): Promise<ThesisStudent | null>;
  countByThesisId(thesisId: number): Promise<number>;
  findByStudentAndThesis(
    studentId: number,
    thesisId: number,
  ): Promise<ThesisStudent | null>;
}
