import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Professor } from '../models/professor';
import { ResponseProfessorDTO } from '../dto/response-professor.dto';

export const PROFESSOR_REPOSITORY_KEY = Symbol('IProfessorRepository');

export interface IProfessorRepository
  extends IReadableRepository<Professor>,
    IWriteableRepository<Professor> {
  findByOrcid(orcid: string): Promise<ResponseProfessorDTO>;
  findByCodProfessor(code: string): Promise<ResponseProfessorDTO>;
}
