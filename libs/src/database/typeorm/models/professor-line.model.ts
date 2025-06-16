import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { ProfessorLine } from '@lib/src/modules/professor-line/models/professor-line';

export const ProfessorLineSchema = new EntitySchema<ProfessorLine>({
  name: 'ProfessorLine',
  tableName: 'professor_line',
  columns: {
    ...BaseColumnSchemaPart,
    professorId: {
      type: Number,
      name: 'professor_id',
      nullable: false,
    },
    lineId: {
      type: Number,
      name: 'line_id',
      nullable: false,
    },
  },
  relations: {
    professor: {
      target: 'Professor',
      type: 'many-to-one',
      joinColumn: {
        name: 'professor_id',
      },
      onDelete: 'CASCADE',
      eager: true,
    },
    line: {
      target: 'ResearchLine',
      type: 'many-to-one',
      joinColumn: {
        name: 'line_id',
      },
      onDelete: 'CASCADE',
      eager: true,
    },
  },
});
