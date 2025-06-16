import { BaseModel } from '@lib/src/common/models';
import { ThesisSection } from './thesis-section';
import { ContentReviewStatus } from './thesis-review-status';
import { Thesis } from '../../thesis/models/thesis';

export class ThesisContent extends BaseModel {
  id: number;

  thesisId: number;
  section: ThesisSection;
  content: string;
  version: number;
  reviewStatus: ContentReviewStatus;
  thesis: Thesis;
}
