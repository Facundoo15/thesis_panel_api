import { BaseModel } from '@lib/src/common/models';
import { Faculty } from '../../faculty/models/faculty';

export class School extends BaseModel {
  id: number;
  name: string;
  state: boolean;
  facultyId: number;
  faculty?: Faculty;
}
