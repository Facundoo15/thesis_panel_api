import { ThesisStudent } from '@lib/src/modules/thesis-student/models/thesis-student';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ThesisStudentSchema = new EntitySchema<ThesisStudent>({
  name: 'ThesisStudent',
  tableName: 'thesis_student',
  columns: {
    ...BaseColumnSchemaPart,
    studentId: {
      type: Number,
      name: 'student_id',
      nullable: false,
    },
    thesisId: {
      type: Number,
      name: 'thesis_id',
      nullable: false,
    },
  },
  relations: {
    student: {
      type: 'many-to-one',
      target: 'Student',
      joinColumn: {
        name: 'student_id',
      },
      onDelete: 'CASCADE',
    },
    thesis: {
      type: 'many-to-one',
      target: 'Thesis',
      joinColumn: {
        name: 'thesis_id',
      },
      onDelete: 'CASCADE',
    },
  },
  indices: [
    {
      name: 'IDX_unique_student_thesis',
      unique: true,
      columns: ['studentId', 'thesisId'],
    },
  ],
});
