import { CreateCourseDTO } from '../dto/create-course.dto';
import { ResponseCourseDTO } from '../dto/response-course.dto';
import { UpdateCourseDTO } from '../dto/update-course.dto';

export const COURSE_SERVICE_KEY = Symbol('ICourseService');

export interface ICourseService {
  create(data: CreateCourseDTO): Promise<ResponseCourseDTO>;
  update(id: number, data: UpdateCourseDTO): Promise<ResponseCourseDTO>;
  getById(id: number): Promise<ResponseCourseDTO | null>;
  getAll(): Promise<ResponseCourseDTO[] | null>;
  delete(id: number): Promise<any>;
}
