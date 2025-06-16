import { Thesis, ThesisStatus } from '@lib/src/modules/thesis/models/thesis';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ThesisSchema = new EntitySchema<Thesis>({
  name: 'Thesis',
  tableName: 'thesis',
  columns: {
    ...BaseColumnSchemaPart,
    title: {
      type: String,
      nullable: false,
    },
    abstract: {
      type: String,
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: ThesisStatus,
      nullable: false,
    },
    submissionDate: {
      type: Date,
      nullable: false,
      name: 'submission_date',
    },
    finalGrade: {
      type: 'float',
      nullable: true,
      name: 'final_grade',
    },
    type: {
      type: String,
      nullable: false,
    },
    professorId: {
      type: Number,
      name: 'professor_id',
    },
    researchDesignId: {
      type: Number,
      name: 'research_design_id',
      nullable: true,
    },
    endThatPurpousesId: {
      type: Number,
      name: 'end_that_purpouses_id',
      nullable: true,
    },
  },
  relations: {
    professor: {
      type: 'many-to-one',
      target: 'Professor',
      joinColumn: {
        name: 'professor_id',
      },
      onDelete: 'CASCADE',
    },
    researchDesign: {
      type: 'many-to-one',
      target: 'ResearchDesign',
      joinColumn: {
        name: 'research_design_id',
      },
      onDelete: 'SET NULL',
    },
    endThatPurposes: {
      type: 'many-to-one',
      target: 'EndThatPurposes',
      joinColumn: {
        name: 'end_that_purpouses_id',
      },
      onDelete: 'SET NULL',
    },
  },
});
