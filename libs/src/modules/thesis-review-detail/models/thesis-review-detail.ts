import { BaseModel } from '@lib/src/common/models';
import { ThesisReview } from '../../thesis-review/models/thesis-review';
import { ThesisContent } from '../../thesis-content/models/thesis-content';

export class ThesisReviewDetail extends BaseModel {
  id: number;
  thesisReviewId: number;
  thesisContentId: number;
  comment: string;
  isResolved: boolean;

  thesisReview: ThesisReview;
  thesisContent: ThesisContent;
}
