import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Budget } from '../models/budget';
import { CreateBudgetDTO } from '../dto/create-budget.dto';
import { UpdateBudgetDTO } from '../dto/update-budget.dto';
import {
  IBudgetService,
  BUDGET_SERVICE_KEY,
} from '../contracts/budget.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Budgets')
@Controller('budgets')
export class BudgetController {
  constructor(
    @Inject(BUDGET_SERVICE_KEY)
    private readonly _budgetService: IBudgetService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo presupuesto' })
  @ApiBody({ type: CreateBudgetDTO })
  @ApiResponse({ status: 201, description: 'Presupuesto creado', type: Budget })
  create(@Body() dto: CreateBudgetDTO): Promise<Budget> {
    return this._budgetService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un presupuesto existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateBudgetDTO })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto actualizado',
    type: Budget,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBudgetDTO,
  ): Promise<Budget> {
    return this._budgetService.update(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un presupuesto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
    type: Budget,
  })
  findById(@Param('id', ParseIntPipe) id: number): Promise<Budget> {
    return this._budgetService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar un presupuesto por nombre' })
  @ApiQuery({ name: 'name', type: String })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
    type: Budget,
  })
  getByName(@Query('name') name: string): Promise<Budget> {
    return this._budgetService.getByName(name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un presupuesto por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Presupuesto eliminado' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._budgetService.delete(id);
  }
}
