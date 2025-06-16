import { BaseModel } from '@lib/src/common/models';

export class Faculty extends BaseModel {
  id: number;
  name: string;
  state: boolean;
}
