import { AcademicYear } from '@lib/src/modules/academic-year/models/academic-year';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const AcademicYearSchema = new EntitySchema<AcademicYear>({
  name: 'AcademicYear',
  tableName: 'academic_years',
  columns: {
    ...BaseColumnSchemaPart,
    numYear: {
      type: Number,
      name: 'num_year',
      nullable: false,
      unique: true,
    },
    stateYear: {
      type: Boolean,
      name: 'state_year',
      nullable: false,
      default: true,
    },
  },
});
