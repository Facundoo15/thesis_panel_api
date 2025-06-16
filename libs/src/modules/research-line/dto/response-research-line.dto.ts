import { Expose } from 'class-transformer';

export class ResponseResearchLineDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
