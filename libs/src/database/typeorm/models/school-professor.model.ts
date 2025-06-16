import { SchoolProfessor } from '@lib/src/modules/school-professor/model/school-professor';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const SchoolProfessorSchema = new EntitySchema<SchoolProfessor>({
  name: 'SchoolProfessor',
  tableName: 'school_professors',
  columns: {
    ...BaseColumnSchemaPart,
    schoolId: {
      type: Number,
      name: 'school_id',
      nullable: false,
    },
    professorId: {
      type: Number,
      name: 'professor_id',
      nullable: false,
    },
  },
  relations: {
    school: {
      target: 'School',
      type: 'many-to-one',
      joinColumn: {
        name: 'school_id',
      },
      onDelete: 'CASCADE',
      eager: true,
    },
    professor: {
      target: 'Professor',
      type: 'many-to-one',
      joinColumn: {
        name: 'professor_id',
      },
      onDelete: 'CASCADE',
      eager: true,
    },
  },
  uniques: [
    {
      name: 'UQ_school_professor',
      columns: ['schoolId', 'professorId'],
    },
  ],
});
