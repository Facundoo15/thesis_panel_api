import { CreateResearchLineDTO } from '../dto/create-research-line.dto';
import { ResponseResearchLineDTO } from '../dto/response-research-line.dto';
import { UpdateResearchLineDTO } from '../dto/update-research-line.dto';

export const RESEARCHLINE_SERVICE_KEY = Symbol('IResearchLineService');

export interface IResearchLineService {
  create(data: CreateResearchLineDTO): Promise<ResponseResearchLineDTO>;
  update(
    id: number,
    data: UpdateResearchLineDTO,
  ): Promise<ResponseResearchLineDTO>;
  findAll(): Promise<ResponseResearchLineDTO[] | null>;
  getById(id: number): Promise<ResponseResearchLineDTO>;
  getByCode(code: string): Promise<ResponseResearchLineDTO>;
  delete(id: number): Promise<void>;
}
