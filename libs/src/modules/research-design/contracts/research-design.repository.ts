import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ResearchDesign } from '../models/research-design';

export const RESEARCHDESIGN_REPOSITORY_KEY = Symbol(
  'IResearchDesignRepository',
);

export interface IResearchDesignRepository
  extends IWriteableRepository<ResearchDesign>,
    IReadableRepository<ResearchDesign> {
  findByName(name: string): Promise<ResearchDesign>;
  findByCode(code: string): Promise<ResearchDesign>;
}
