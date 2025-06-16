import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { ThesisContent } from '../models/thesis-content';

export const THESISCONTENT_REPOSITORY_KEY = Symbol('IThesisContentRepository');

export interface IThesisContentRepository
  extends IReadableRepository<ThesisContent>,
    IWriteableRepository<ThesisContent> {
  findByThesisId(thesisId: number): Promise<ThesisContent[]>;

  findByThesisAndSection(
    thesisId: number,
    section: string,
  ): Promise<ThesisContent | null>;

  findPendingByThesis(thesisId: number): Promise<ThesisContent[]>;

  updateReviewStatus(
    contentId: number,
    reviewStatus: 'PENDING' | 'REVIEWED' | 'CORRECTIONS_REQUESTED',
  ): Promise<void>;

  incrementVersion(contentId: number): Promise<void>;
}
