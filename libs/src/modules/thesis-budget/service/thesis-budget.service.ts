import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { IThesisBudgetService } from '../contracts/thesis-budget.service';
import {
  IThesisBudgetRepository,
  THESISBUDGET_REPOSITORY_KEY,
} from '../contracts/thesis-budget.repository';
import {
  IThesisService,
  THESIS_SERVICE_KEY,
} from '../../thesis/contracts/thesis.service';
import {
  BUDGET_SERVICE_KEY,
  IBudgetService,
} from '../../budget/contracts/budget.service';
import { CreateThesisBudgetDTO } from '../dto/create-thesis-budget.dto';
import { ResponseThesisBudgetDTO } from '../dto/response-thesis-budget.dto';
import { UpdateThesisBudgetDTO } from '../dto/update-thesis-budget.dto';
import { plainToInstance } from 'class-transformer';
import { ThesisBudget } from '../models/thesis-budget';

export class ThesisBudgetService implements IThesisBudgetService {
  constructor(
    @Inject(THESISBUDGET_REPOSITORY_KEY)
    private readonly _thesisBudgetRepository: IThesisBudgetRepository,
    @Inject(THESIS_SERVICE_KEY) private readonly _thesisService: IThesisService,
    @Inject(BUDGET_SERVICE_KEY) private readonly _budgetService: IBudgetService,
  ) {}
  async create(data: CreateThesisBudgetDTO): Promise<ResponseThesisBudgetDTO> {
    const thesis = await this._thesisService.findById(data.thesisId);
    const budget = await this._budgetService.findById(data.budgetId);

    if (data.amount !== undefined && data.amount < 0) {
      throw new BadRequestException('El monto no puede ser negativo.');
    }

    const thesisBudget = plainToInstance(ThesisBudget, data);

    const saved = await this._thesisBudgetRepository.create(thesisBudget);

    return plainToInstance(ResponseThesisBudgetDTO, saved);
  }

  async update(
    id: number,
    data: UpdateThesisBudgetDTO,
  ): Promise<ResponseThesisBudgetDTO> {
    const existing = await this._thesisBudgetRepository.findById(id);
    if (!existing) throw new NotFoundException('ThesisBudget not found');

    const updated = await this._thesisBudgetRepository.update(id, {
      ...existing,
      ...data,
    });

    return plainToInstance(ResponseThesisBudgetDTO, updated);
  }
  async findAll(): Promise<ResponseThesisBudgetDTO[] | null> {
    return (await this._thesisBudgetRepository.findAll()).map((e) =>
      plainToInstance(ResponseThesisBudgetDTO, e),
    );
  }
  async findById(id: number): Promise<ResponseThesisBudgetDTO> {
    const entity = await this._thesisBudgetRepository.findById(id);
    if (!entity)
      throw new NotFoundException('Presupuesto de tesis no encontrado');
    return plainToInstance(ResponseThesisBudgetDTO, entity);
  }
  async delete(id: number): Promise<void> {
    const entity = await this.findById(id);
    await this._thesisBudgetRepository.delete(id);
  }
  async findByThesisId(
    thesisId: number,
  ): Promise<ResponseThesisBudgetDTO[] | null> {
    return (await this._thesisBudgetRepository.findByThesisId(thesisId)).map(
      (e) => plainToInstance(ResponseThesisBudgetDTO, e),
    );
  }
  async findByThesisAndBudget(
    thesisId: number,
    budgetId: number,
  ): Promise<ResponseThesisBudgetDTO | null> {
    const entity = await this._thesisBudgetRepository.findByThesisAndBudget(
      thesisId,
      budgetId,
    );
    return plainToInstance(ResponseThesisBudgetDTO, entity);
  }
  async updateApprovalStatus(id: number, isApproved: boolean): Promise<void> {
    const entity = await this._thesisBudgetRepository.findById(id);
    if (!entity) throw new NotFoundException('ThesisBudget not found');

    await this._thesisBudgetRepository.update(id, {
      ...entity,
      isApproved,
    });
  }
  async getTotalAmountByThesisId(thesisId: number): Promise<number> {
    return this._thesisBudgetRepository.getTotalAmountByThesisId(thesisId);
  }
  async deleteByThesisId(thesisId: number): Promise<void> {
    await this._thesisBudgetRepository.deleteByThesisId(thesisId);
  }
}
