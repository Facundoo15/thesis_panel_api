import { CreateThesisDTO } from '../dto/create-thesis.dto';
import { ResponseThesisDTO } from '../dto/response-thesis.dto';
import { UpdateThesisDTO } from '../dto/update-thesis.dto';
import { ThesisStatus } from '../models/thesis';

export const THESIS_SERVICE_KEY = Symbol('IThesisService');

export interface IThesisService {
  create(data: CreateThesisDTO): Promise<ResponseThesisDTO>;
  update(id: number, data: UpdateThesisDTO): Promise<ResponseThesisDTO>;
  delete(id: number): Promise<void>;

  findById(id: number): Promise<ResponseThesisDTO | null>;
  findAll(): Promise<ResponseThesisDTO[]>;

  findByTitle(title: string): Promise<ResponseThesisDTO | null>;
  findByStatus(status: ThesisStatus): Promise<ResponseThesisDTO[]>;
  findByProfessorId(professorId: number): Promise<ResponseThesisDTO[]>;
  findByResearchDesignId(designId: number): Promise<ResponseThesisDTO[]>;
  findByEndThatPurposesId(purposeId: number): Promise<ResponseThesisDTO[]>;

  approveThesis(id: number, grade: number): Promise<ResponseThesisDTO>;
  rejectThesis(id: number): Promise<ResponseThesisDTO>;
}
