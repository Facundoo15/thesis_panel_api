import { CreateResearchDesignDTO } from '../dto/create-research-design.dto';
import { ResponseResearchDesignDTO } from '../dto/response-research-design.dto';
import { UpdateResearchDesignDTO } from '../dto/update-research-design.dto';

export const RESEARCHDESIGN_SERVICE_KEY = Symbol('IResearchDesignService');

export interface IResearchDesignService {
  create(data: CreateResearchDesignDTO): Promise<ResponseResearchDesignDTO>;
  update(
    id: number,
    data: UpdateResearchDesignDTO,
  ): Promise<ResponseResearchDesignDTO>;
  findById(id: number): Promise<ResponseResearchDesignDTO>;
  findByName(name: string): Promise<ResponseResearchDesignDTO>;
  findByCode(code: string): Promise<ResponseResearchDesignDTO>;
  findAll(): Promise<ResponseResearchDesignDTO[] | null>;
  delete(id: number): Promise<void>;
}
