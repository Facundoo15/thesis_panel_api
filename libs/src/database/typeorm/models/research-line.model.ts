import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';
import { ResearchLine } from '@lib/src/modules/research-line/models/research-line';

export const ResearchLineSchema = new EntitySchema<ResearchLine>({
  name: 'ResearchLine',
  tableName: 'research_lines',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      nullable: false,
      unique: true,
    },
    code: {
      type: String,
      name: 'code',
      nullable: false,
      unique: true,
    },
  },
});
