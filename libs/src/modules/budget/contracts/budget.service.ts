import { CreateBudgetDTO } from '../dto/create-budget.dto';
import { UpdateBudgetDTO } from '../dto/update-budget.dto';
import { Budget } from '../models/budget';

export const BUDGET_SERVICE_KEY = Symbol('IBudgetService');

export interface IBudgetService {
  create(data: CreateBudgetDTO): Promise<Budget>;
  update(id: number, data: UpdateBudgetDTO): Promise<Budget>;
  findById(id: number): Promise<Budget>;
  getByName(name: string): Promise<Budget>;
  delete(id: number): Promise<void>;
}
