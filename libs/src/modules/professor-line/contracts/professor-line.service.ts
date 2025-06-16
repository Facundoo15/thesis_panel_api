import { ResponseProfessorDTO } from '../../professor/dto/response-professor.dto';
import { Professor } from '../../professor/models/professor';
import { CreateProfessorLineDTO } from '../dto/create-professor-line.dto';
import { ResponseProfessorLineDTO } from '../dto/response-professor-line.dto';

export const PROFESSORLINE_SERVICE_KEY = Symbol('IProfessorLineService');

export interface IProfessorLineService {
  create(data: CreateProfessorLineDTO): Promise<ResponseProfessorLineDTO>;
  findProfessorsByLine(lineId: number): Promise<ResponseProfessorDTO[] | null>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ResponseProfessorLineDTO>;
  findAll(): Promise<ResponseProfessorLineDTO[] | null>;
}
