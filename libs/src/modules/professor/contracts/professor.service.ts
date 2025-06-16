import { CreateProfessorDTO } from '../dto/create-professor.dto';
import { ResponseProfessorDTO } from '../dto/response-professor.dto';
import { UpdateProfessorDTO } from '../dto/update-professor.dto';

export const PROFESSOR_SERVICE_KEY = Symbol('IProfessorService');

export interface IProfessorService {
  create(data: CreateProfessorDTO): Promise<ResponseProfessorDTO>;
  update(id: number, data: UpdateProfessorDTO): Promise<ResponseProfessorDTO>;
  getById(id: number): Promise<ResponseProfessorDTO>;
  findAll(): Promise<ResponseProfessorDTO[] | null>;
  getByOrcid(orcid: string): Promise<ResponseProfessorDTO>;
  getByCode(code: string): Promise<ResponseProfessorDTO>;
  delete(id: number): Promise<void>;
}
