import { BaseModel } from '@lib/src/common/models';
import { Professor } from '../../professor/models/professor';
import { School } from '../../school/models/school';

export class SchoolProfessor extends BaseModel {
  id: number;
  schoolId: number;
  professorId: number;

  school?: School;
  professor?: Professor;
}
