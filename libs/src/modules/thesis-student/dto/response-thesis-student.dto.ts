import { Student } from '../../student/models/student';
import { Thesis } from '../../thesis/models/thesis';

export class ResponseThesisStudentDTO {
  id: number;
  studentId: number;
  thesisId: number;

  student?: Student;
  thesis?: Thesis;
}
