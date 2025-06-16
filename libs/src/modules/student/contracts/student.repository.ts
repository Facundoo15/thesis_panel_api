import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Student } from '../models/student';

export const STUDENT_REPOSITORY_KEY = Symbol('IStudentRepository');

export interface IStudentRepository
  extends IReadableRepository<Student>,
    IWriteableRepository<Student> {
  findByCode(code: string): Promise<Student>;
  findByDni(dni: string): Promise<Student>;
}
