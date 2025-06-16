import { BaseModel } from '@lib/src/common/models';
import { User } from '../../user/models/user';

export class Professor extends BaseModel {
  id: number;
  codProfessor: string;
  orcid: string;
  academicDegree: string;
  category: string;
  userId: number;
  user?: User;
}
