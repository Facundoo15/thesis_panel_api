import { Expose } from 'class-transformer';
import { ContentReviewStatus } from '../models/thesis-review-status';
import { ThesisSection } from '../models/thesis-section';

export class ResponseThesisContentDTO {
  @Expose()
  id: number;

  @Expose()
  thesisId: number;

  @Expose()
  section: ThesisSection;

  @Expose()
  content: string;

  @Expose()
  version: number;

  @Expose()
  reviewStatus: ContentReviewStatus;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdAt: Date;
}
