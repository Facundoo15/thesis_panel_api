import { Expose, Transform } from 'class-transformer';

export class ResponsePeriodDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  state: boolean;

  @Expose()
  academicYearId: number;

  @Expose()
  @Transform(({ obj }) => obj.academicYear?.numYear)
  academicYear: number;

  @Expose()
  period: number;

  @Expose()
  @Transform(({ obj }) => {
    const year = obj.academicYear?.numYear ?? 'AÑO?';
    const period = obj.period ?? 'PERIODO?';
    return `${year} - ${period}`;
  })
  periodComplete: string;
}
