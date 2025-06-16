import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ResearchLine } from '../models/research-line';

export const RESEARCHLINE_REPOSITORY_KEY = Symbol('IResearchLineRepository');

export interface IResearchLineRepository
  extends IReadableRepository<ResearchLine>,
    IWriteableRepository<ResearchLine> {
  getByCode(code: string): Promise<ResearchLine | null>;
  getByName(name: string): Promise<ResearchLine | null>;
}
