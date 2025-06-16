import { Period } from '@lib/src/modules/period/models/period';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const PeriodSchema = new EntitySchema<Period>({
  name: 'Period',
  tableName: 'periods',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      nullable: false,
    },
    period: {
      type: Number,
      name: 'period',
      nullable: false,
    },
    state: {
      type: Boolean,
      name: 'state',
      default: true,
    },
    academicYearId: {
      type: Number,
      name: 'academic_year_id',
      nullable: false,
    },
  },
  relations: {
    academicYear: {
      target: 'AcademicYear',
      type: 'many-to-one',
      joinColumn: {
        name: 'academic_year_id',
      },
      eager: true,
    },
  },
});
