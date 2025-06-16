import { CreateSchoolDTO } from '../dto/create-school.dto';
import { ResponseSchoolDTO } from '../dto/response-school.dto';

export const SCHOOL_SERVICE_KEY = Symbol('ISchoolService');

export interface ISchoolService {
  create(data: CreateSchoolDTO): Promise<ResponseSchoolDTO>;
  getById(id: number): Promise<ResponseSchoolDTO>;
  findAll(): Promise<ResponseSchoolDTO[] | null>;
  delete(id: number): Promise<void>;
}
