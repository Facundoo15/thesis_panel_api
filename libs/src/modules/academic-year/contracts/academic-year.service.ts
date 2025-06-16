import { CreateAcademicYearDTO } from '../dto/create-academic-year.dto';
import { ResponseAcademicYearDTO } from '../dto/response-academic-year.dto';
import { UpdateAcademicYearDTO } from '../dto/update-academic.year.dto';

export const ACADEMICYEAR_SERVICE_KEY = Symbol('IAcademicYearService');

export interface IAcademicYearService {
  create(data: CreateAcademicYearDTO): Promise<ResponseAcademicYearDTO>;
  update(
    id: number,
    data: UpdateAcademicYearDTO,
  ): Promise<ResponseAcademicYearDTO>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ResponseAcademicYearDTO>;
}
