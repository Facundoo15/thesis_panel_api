import { CreateThesisBudgetDTO } from '../dto/create-thesis-budget.dto';
import { ResponseThesisBudgetDTO } from '../dto/response-thesis-budget.dto';
import { UpdateThesisBudgetDTO } from '../dto/update-thesis-budget.dto';

export const THESISBUDGET_SERVICE_KEY = Symbol('IThesisBudgetService');

export interface IThesisBudgetService {
  create(data: CreateThesisBudgetDTO): Promise<ResponseThesisBudgetDTO>;
  update(
    id: number,
    data: UpdateThesisBudgetDTO,
  ): Promise<ResponseThesisBudgetDTO>;
  findAll(): Promise<ResponseThesisBudgetDTO[] | null>;
  findById(id: number): Promise<ResponseThesisBudgetDTO>;
  delete(id: number): Promise<void>;
  findByThesisId(thesisId: number): Promise<ResponseThesisBudgetDTO[] | null>;

  findByThesisAndBudget(
    thesisId: number,
    budgetId: number,
  ): Promise<ResponseThesisBudgetDTO | null>;

  updateApprovalStatus(id: number, isApproved: boolean): Promise<void>;

  getTotalAmountByThesisId(thesisId: number): Promise<number>;

  deleteByThesisId(thesisId: number): Promise<void>;
}
