import { Expose } from 'class-transformer';

export class ResponseEndThatPurposes {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
