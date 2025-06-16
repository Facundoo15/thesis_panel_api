import { Faculty } from '@lib/src/modules/faculty/models/faculty';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const FacultySchema = new EntitySchema<Faculty>({
  name: 'Faculty',
  tableName: 'faculties',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      nullable: false,
      unique: true,
    },
    state: {
      type: Boolean,
      name: 'state',
      default: true,
    },
  },
});
