import { EndThatPurposes } from '@lib/src/modules/end-that-purposes/models/end-that-purposes';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const EndThatPurposesSchema = new EntitySchema<EndThatPurposes>({
  name: 'EndThatPurposes',
  tableName: 'end_that_purposes',
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
