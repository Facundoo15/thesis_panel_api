import { CreateSchoolProfessorDTO } from '../dto/create-school-professor.dto';
import { ResponseSchoolProfessorDTO } from '../dto/response-school-professor.dto';
import { SchoolProfessor } from '../model/school-professor';

export const SCHOOLPROFESSOR_SERVICE_KEY = Symbol('ISchoolProfessorService');

export interface ISchoolProfessorService {
  create(data: CreateSchoolProfessorDTO): Promise<ResponseSchoolProfessorDTO>;
  findBySchoolAndProfessor(
    schoolId: number,
    professorId: number,
  ): Promise<ResponseSchoolProfessorDTO>;
  findProfessorsBySchool(
    schoolId: number,
  ): Promise<ResponseSchoolProfessorDTO[]>;
  findSchoolsByProfessors(
    professorId: number,
  ): Promise<ResponseSchoolProfessorDTO[]>;
  delete(id: number): Promise<void>;
}
