import { BaseModel } from '@lib/src/common/models';

export class Budget extends BaseModel {
  id: number;
  name: string;
  universalCode: string;
}
