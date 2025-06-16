import { BaseModel } from '@lib/src/common/models';
import { Thesis } from '../../thesis/models/thesis';
import { Student } from '../../student/models/student';

export class ThesisStudent extends BaseModel {
  id: number;

  studentId: number;
  thesisId: number;

  student: Student;
  thesis: Thesis;
}
