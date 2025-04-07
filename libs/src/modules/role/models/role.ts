import { BaseModel } from '@lib/src/common/models';
import { Expose } from 'class-transformer';

export class Role extends BaseModel {
  id: number;
  @Expose()
  roleName: string;
}
