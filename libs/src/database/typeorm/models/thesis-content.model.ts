import { ThesisContent } from '@lib/src/modules/thesis-content/models/thesis-content';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { ThesisSection } from '@lib/src/modules/thesis-content/models/thesis-section';
import { ContentReviewStatus } from '@lib/src/modules/thesis-content/models/thesis-review-status';

export const ThesisContentSchema = new EntitySchema<ThesisContent>({
  name: 'ThesisContent',
  tableName: 'thesis_content',
  columns: {
    ...BaseColumnSchemaPart,
    thesisId: { type: Number, name: 'thesis_id', nullable: false },
    section: { type: 'enum', enum: ThesisSection, nullable: false },
    content: { type: 'text', nullable: false },
    version: { type: Number, default: 1 },
    reviewStatus: {
      type: 'enum',
      enum: ContentReviewStatus,
      default: ContentReviewStatus.PENDING,
    },
  },
  uniques: [
    {
      columns: ['thesisId', 'section'],
    },
  ],
  relations: {
    thesis: {
      type: 'many-to-one',
      target: 'Thesis',
      joinColumn: {
        name: 'thesis_id',
      },
      onDelete: 'CASCADE',
    },
  },
});
