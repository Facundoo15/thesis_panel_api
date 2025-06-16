import { Inject, NotFoundException } from '@nestjs/common';
import { IBudgetService } from '../contracts/budget.service';
import {
  BUDGET_REPOSITORY_KEY,
  IBudgetRepository,
} from '../contracts/budget.repository';
import { Budget } from '../models/budget';
import { CreateBudgetDTO } from '../dto/create-budget.dto';
import { UpdateBudgetDTO } from '../dto/update-budget.dto';
import { plainToInstance } from 'class-transformer';

export class BudgetService implements IBudgetService {
  constructor(
    @Inject(BUDGET_REPOSITORY_KEY)
    private readonly _budgetRepository: IBudgetRepository,
  ) {}

  async create(data: CreateBudgetDTO): Promise<Budget> {
    const budget = plainToInstance(Budget, {
      ...data,
    });

    const saved = await this._budgetRepository.create(budget);
    return saved;
  }
  async update(id: number, data: UpdateBudgetDTO): Promise<Budget> {
    const existing = await this._budgetRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Presupuesto no encontrado');
    }

    const updated = Object.assign(existing, data);

    const saved = await this._budgetRepository.update(id, updated);
    return saved;
  }

  async findById(id: number): Promise<Budget> {
    const exist = await this._budgetRepository.findById(id);
    if (!exist) throw new NotFoundException('Presupuesto no encontrado');
    return exist;
  }
  async getByName(name: string): Promise<Budget> {
    const budget = await this._budgetRepository.findByName(name);
    if (!budget) throw new NotFoundException('Presupuesto no encontrado');
    return budget;
  }
  async delete(id: number): Promise<void> {
    const exist = await this._budgetRepository.findById(id);
    if (!exist) throw new NotFoundException('Presupuesto no encontrado');
    await this._budgetRepository.delete(id);
  }
}
