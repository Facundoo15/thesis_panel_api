import { ResearchDesign } from '@lib/src/modules/research-design/models/research-design';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ResearchDesignSchema = new EntitySchema<ResearchDesign>({
  name: 'ResearchDesign',
  tableName: 'research_designs',
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
