import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ProfessorLine } from '../models/professor-line';
import { Professor } from '../../professor/models/professor';

export const PROFESSORLINE_REPOSITORY_KEY = Symbol('IProfessorLineRepository');

export interface IProfessorLineRepository
  extends IReadableRepository<ProfessorLine>,
    IWriteableRepository<ProfessorLine> {
  findProfessorsByLine(lineId: number): Promise<Professor[] | null>;
  existsByProfessorAndLine(
    professorId: number,
    lineId: number,
  ): Promise<boolean>;
}
