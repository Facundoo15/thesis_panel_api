import { CreatePeriodDTO } from '../dto/create-period.dto';
import { ResponsePeriodDTO } from '../dto/response-period.dto';
import { UpdatePeriodDTO } from '../dto/update-period.dto';

export const PERIOD_SERVICE_KEY = Symbol('IPeriodService');

export interface IPeriodService {
  create(data: CreatePeriodDTO): Promise<ResponsePeriodDTO>;
  update(id: number, data: UpdatePeriodDTO): Promise<ResponsePeriodDTO>;
  findById(id: number): Promise<ResponsePeriodDTO>;
  findByPeriod(period: string): Promise<ResponsePeriodDTO>;
  delete(id: number): Promise<void>;
  getAll(): Promise<ResponsePeriodDTO[] | null>;
}
