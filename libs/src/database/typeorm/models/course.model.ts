import { Course } from '@lib/src/modules/course/models/course';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const CourseSchema = new EntitySchema<Course>({
  name: 'Course',
  tableName: 'courses',
  columns: {
    ...BaseColumnSchemaPart,
    name: {
      type: String,
      name: 'name',
      nullable: false,
    },
    state: {
      type: Boolean,
      name: 'state',
      nullable: false,
      default: true,
    },

    description: {
      type: String,
      name: 'description',
      nullable: true,
      default: 'DEFAULT COURSE',
    },

    academicYearId: {
      type: Number,
      name: 'academic_year_id',
      nullable: false,
    },

    periodId: {
      type: Number,
      name: 'period_id',
      nullable: false,
    },

    schoolId: {
      type: Number,
      name: 'school_id',
      nullable: false,
    },
  },
  relations: {
    academicYear: {
      type: 'many-to-one',
      target: 'AcademicYear',
      nullable: false,
      joinColumn: {
        name: 'academic_year_id',
      },
      eager: true,
    },

    period: {
      type: 'many-to-one',
      target: 'Period',
      nullable: false,
      joinColumn: {
        name: 'period_id',
      },
      eager: true,
    },

    school: {
      type: 'many-to-one',
      target: 'School',
      nullable: false,
      joinColumn: {
        name: 'school_id',
      },
      eager: true,
    },
  },
});
