import { Professor } from '@lib/src/modules/professor/models/professor';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const ProfessorSchema = new EntitySchema<Professor>({
  name: 'Professor',
  tableName: 'professors',
  columns: {
    ...BaseColumnSchemaPart,
    codProfessor: {
      type: String,
      name: 'cod_professor',
      nullable: false,
      unique: true,
    },
    orcid: {
      type: String,
      name: 'orcid',
      nullable: false,
      unique: true,
    },
    academicDegree: {
      type: String,
      name: 'academic_degree',
      nullable: false,
    },
    category: {
      type: String,
      name: 'category',
      nullable: false,
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
