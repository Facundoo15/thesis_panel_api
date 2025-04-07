import { Student } from '@lib/src/modules/student/models/student';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const StudentSchema = new EntitySchema<Student>({
  name: 'Student',
  tableName: 'students',
  columns: {
    ...BaseColumnSchemaPart,
    codStudent: {
      type: String,
      name: 'cod_student',
      nullable: false,
    },
    dni: {
      type: String,
      name: 'dni',
      nullable: false,
      unique: true,
    },
    academicLevel: {
      type: String,
      name: 'academic_level',
      nullable: false,
    },
    entrySemester: {
      type: String,
      name: 'entry_semester',
      nullable: true,
    },
    userId: {
      type: Number,
      name: 'user_id',
      nullable: false,
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      joinColumn: {
        name: 'user_id',
      },
      eager: true,
    },
  },
});
