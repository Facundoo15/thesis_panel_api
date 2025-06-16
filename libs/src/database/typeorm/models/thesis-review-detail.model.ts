import { ThesisReviewDetail } from '@lib/src/modules/thesis-review-detail/models/thesis-review-detail';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ThesisReviewDetailSchema = new EntitySchema<ThesisReviewDetail>({
  name: 'ThesisReviewDetail',
  tableName: 'thesis_review_detail',
  columns: {
    ...BaseColumnSchemaPart,
    thesisReviewId: {
      type: Number,
      name: 'thesis_review_id',
      nullable: false,
    },
    thesisContentId: {
      type: Number,
      name: 'thesis_content_id',
      nullable: false,
    },
    comment: {
      type: String,
      length: 200,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  relations: {
    thesisReview: {
      type: 'many-to-one',
      target: 'ThesisReview',
      joinColumn: {
        name: 'thesis_review_id',
      },
      onDelete: 'CASCADE',
    },
    thesisContent: {
      type: 'many-to-one',
      target: 'ThesisContent',
      joinColumn: {
        name: 'thesis_content_id',
      },
      onDelete: 'CASCADE',
    },
  },
});
