import { BaseModel } from '@lib/src/common/models';
import { User } from '../../user/models/user';

export class Student extends BaseModel {
  codStudent: string;
  dni: string;
  academicLevel: string;
  entrySemester: string;
  userId: number;
  user?: User;
}
