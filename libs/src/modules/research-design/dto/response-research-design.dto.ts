import { Expose } from 'class-transformer';

export class ResponseResearchDesignDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  code: string;
}
