import { Expose, Transform } from 'class-transformer';
import { UserStatus } from '../../user/models/user';

export class ResponseStudentDTO {
  @Expose()
  id: number;

  @Expose()
  codStudent: string;

  @Expose()
  dni: string;

  @Expose()
  academicLevel: string;

  @Expose()
  entrySemester: string;

  @Expose()
  @Transform(({ obj }) => `${obj.user?.firstName} ${obj.user?.lastName}`)
  fullName: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.email)
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.status)
  status: UserStatus;
}
