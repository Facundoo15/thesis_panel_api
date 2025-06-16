import { School } from '@lib/src/modules/school/models/school';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const SchoolSchema = new EntitySchema<School>({
  name: 'School',
  tableName: 'schools',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      unique: true,
      nullable: false,
    },
    state: {
      type: Boolean,
      name: 'state',
      default: true,
    },
    facultyId: {
      type: Number,
      name: 'faculty_id',
    },
  },
  relations: {
    faculty: {
      target: 'Faculty',
      type: 'many-to-one',
      joinColumn: {
        name: 'faculty_id',
      },
      eager: true,
    },
  },
});
