import { CreateStudentDTO } from '../dto/create-student.dto';
import { ResponseStudentDTO } from '../dto/student-response.dto';

export const STUDENT_SERVICE_KEY = Symbol('IStudentService');

export interface IStudentService {
  create(data: CreateStudentDTO): Promise<ResponseStudentDTO>;
  findByCodeStudent(code: string): Promise<ResponseStudentDTO>;
  getById(id: number): Promise<ResponseStudentDTO>;
  findAll(): Promise<ResponseStudentDTO[] | null>;
  deleteById(id: number): Promise<void>;
}
