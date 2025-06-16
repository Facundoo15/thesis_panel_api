import { ThesisReview } from '@lib/src/modules/thesis-review/models/thesis-review';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ThesisReviewSchema = new EntitySchema<ThesisReview>({
  name: 'ThesisReview',
  tableName: 'thesis_review',
  columns: {
    ...BaseColumnSchemaPart,
    thesisId: {
      type: Number,
      name: 'thesis_id',
      nullable: false,
    },
    professorId: {
      type: Number,
      name: 'professor_id',
      nullable: false,
    },
    generalComment: {
      type: 'text',
      name: 'general_comment',
    },
  },
  relations: {
    thesis: {
      type: 'many-to-one',
      target: 'Thesis',
      joinColumn: {
        name: 'thesis_id',
      },
      onDelete: 'CASCADE',
    },
    professor: {
      type: 'many-to-one',
      target: 'Professor',
      joinColumn: {
        name: 'professor_id',
      },
      onDelete: 'CASCADE',
    },
  },
});
