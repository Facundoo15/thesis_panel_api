import { Expose, Type } from 'class-transformer';
import { ResponseSchoolDTO } from '../../school/dto/response-school.dto';
import { ResponseProfessorDTO } from '../../professor/dto/response-professor.dto';

export class ResponseSchoolProfessorDTO {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ResponseSchoolDTO)
  school: ResponseSchoolDTO;

  @Expose()
  @Type(() => ResponseProfessorDTO)
  professor: ResponseProfessorDTO;
}
