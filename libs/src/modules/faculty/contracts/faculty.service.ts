import { CreateFacultyDTO } from '../dto/create-faculty.dto';
import { ResponseFacultyDTO } from '../dto/response-faculty.dto';

export const FACULTY_SERVICE_KEY = Symbol('IFacultyService');

export interface IFacultyService {
  create(data: CreateFacultyDTO): Promise<ResponseFacultyDTO>;
  getById(id: number): Promise<ResponseFacultyDTO>;
  findAll(): Promise<ResponseFacultyDTO[] | null>;
}
