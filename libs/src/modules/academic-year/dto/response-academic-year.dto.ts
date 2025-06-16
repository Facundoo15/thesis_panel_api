import { Expose } from 'class-transformer';

export class ResponseAcademicYearDTO {
  @Expose()
  id: number;
  @Expose()
  numYear: number;
  @Expose()
  stateYear: boolean;
}
