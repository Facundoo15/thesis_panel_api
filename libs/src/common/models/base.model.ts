import { Expose } from 'class-transformer';

export class BaseModel {
  @Expose({ name: 'id' })
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
