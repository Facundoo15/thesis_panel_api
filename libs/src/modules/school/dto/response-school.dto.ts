import { Expose, Transform } from 'class-transformer';

export class ResponseSchoolDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  state: boolean;

  @Expose()
  facultyId: number;

  @Expose()
  @Transform(({ obj }) => obj.faculty?.name)
  facultyName: string;
}
