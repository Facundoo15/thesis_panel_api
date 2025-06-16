import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { SchoolProfessor } from '../model/school-professor';

export const SCHOOLPROFESSOR_REPOSITORY_KEY = Symbol(
  'ISchoolProfessorRepository',
);
export interface ISchoolProfessorRepository
  extends IReadableRepository<SchoolProfessor>,
    IWriteableRepository<SchoolProfessor> {
  findByProfessorAndSchool(
    schoolId: number,
    professorId: number,
  ): Promise<SchoolProfessor | null>;
  findProfessorBySchool(schoolId: number): Promise<SchoolProfessor[]>;
  findSchoolsByProfessor(professorId: number): Promise<SchoolProfessor[]>;
}
