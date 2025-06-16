import { Expose, Transform } from 'class-transformer';
import { UserStatus } from '../../user/models/user';

export class ResponseProfessorDTO {
  @Expose()
  id: number;

  @Expose()
  codProfessor: string;

  @Expose()
  orcid: string;

  @Expose()
  academicDegree: string;

  @Expose()
  category: string;

  @Expose()
  @Transform(({ obj }) => `${obj.user?.firstName} ${obj.user?.lastName}`)
  fullName: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.email)
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.status)
  status: UserStatus;

  @Expose()
  @Transform(({ obj }) => obj.user?.role?.name)
  role: string;
}
