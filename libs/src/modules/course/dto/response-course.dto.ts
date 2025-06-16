import { Expose, Transform } from 'class-transformer';

export class ResponseCourseDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  credits: number;

  @Expose()
  academicYearId: number;

  @Expose()
  @Transform(({ obj }) => obj.academicYear?.numYear)
  academicYear: number;

  @Expose()
  periodId: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.period
      ? `${obj.period.academicYear?.numYear}-${obj.period.period}`
      : null,
  )
  period: string;

  @Expose()
  schoolId: number;

  @Expose()
  @Transform(({ obj }) => obj.school?.name)
  school: string;
}
