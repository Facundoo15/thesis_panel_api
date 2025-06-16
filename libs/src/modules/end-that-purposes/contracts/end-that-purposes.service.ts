import { CreateEndThatPurposesDTO } from '../dto/create-end-that-purposes.dto';
import { ResponseEndThatPurposes } from '../dto/response-end-that-purposes.dto';
import { UpdateEndThatPurposes } from '../dto/update-end-that-purposes.dto';

export const ENDTHATPURPOSES_SERVICE_KEY = Symbol('IEndThatPurposesService');

export interface IEndThatPurposesService {
  create(data: CreateEndThatPurposesDTO): Promise<ResponseEndThatPurposes>;
  update(
    id: number,
    data: UpdateEndThatPurposes,
  ): Promise<ResponseEndThatPurposes>;
  findById(id: number): Promise<ResponseEndThatPurposes>;
  findByName(name: string): Promise<ResponseEndThatPurposes>;
  findByCode(code: string): Promise<ResponseEndThatPurposes>;
  findAll(): Promise<ResponseEndThatPurposes[] | null>;
  delete(id: number): Promise<void>;
}
