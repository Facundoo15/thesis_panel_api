import { Expose, Type } from 'class-transformer';
import { ResponseProfessorDTO } from '../../professor/dto/response-professor.dto';
import { ResponseResearchLineDTO } from '../../research-line/dto/response-research-line.dto';

export class ResponseProfessorLineDTO {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ResponseProfessorDTO)
  professor: ResponseProfessorDTO;

  @Expose()
  @Type(() => ResponseResearchLineDTO)
  line: ResponseResearchLineDTO;
}
