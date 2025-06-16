import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Thesis, ThesisStatus } from '../models/thesis';

export const THESIS_REPOSITORY_KEY = Symbol('IThesisRepository');

export interface IThesisRepository
  extends IWriteableRepository<Thesis>,
    IReadableRepository<Thesis> {
  findByTitle(title: string): Promise<Thesis | null>;
  findByStatus(status: ThesisStatus): Promise<Thesis[]>;
  findByProfessorId(professorId: number): Promise<Thesis[]>;
  findByResearchDesignId(designId: number): Promise<Thesis[]>;
  findByEndThatPurpousesId(purposeId: number): Promise<Thesis[]>;
  approveThesis(id: number, grade: number): Promise<Thesis>;
  rejectThesis(id: number, reason?: string): Promise<Thesis>;
}
