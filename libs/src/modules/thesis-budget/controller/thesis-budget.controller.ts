import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import {
  IThesisBudgetService,
  THESISBUDGET_SERVICE_KEY,
} from '../contracts/thesis-budget.service';
import { CreateThesisBudgetDTO } from '../dto/create-thesis-budget.dto';
import { UpdateThesisBudgetDTO } from '../dto/update-thesis-budget.dto';
import { ResponseThesisBudgetDTO } from '../dto/response-thesis-budget.dto';

@ApiTags('Presupuesto de Tesis')
@Controller('thesis-budgets')
export class ThesisBudgetController {
  constructor(
    @Inject(THESISBUDGET_SERVICE_KEY)
    private readonly _thesisBudgetService: IThesisBudgetService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un presupuesto para una tesis' })
  @ApiResponse({
    status: 201,
    description: 'Presupuesto creado',
    type: ResponseThesisBudgetDTO,
  })
  async create(
    @Body() dto: CreateThesisBudgetDTO,
  ): Promise<ResponseThesisBudgetDTO> {
    return this._thesisBudgetService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un presupuesto existente' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto actualizado',
    type: ResponseThesisBudgetDTO,
  })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateThesisBudgetDTO,
  ): Promise<ResponseThesisBudgetDTO> {
    return this._thesisBudgetService.update(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los presupuestos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de presupuestos',
    type: [ResponseThesisBudgetDTO],
  })
  async findAll(): Promise<ResponseThesisBudgetDTO[] | null> {
    return this._thesisBudgetService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un presupuesto por ID' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
    type: ResponseThesisBudgetDTO,
  })
  async findById(@Param('id') id: number): Promise<ResponseThesisBudgetDTO> {
    return this._thesisBudgetService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un presupuesto por ID' })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiResponse({ status: 204, description: 'Presupuesto eliminado' })
  async delete(@Param('id') id: number): Promise<void> {
    return this._thesisBudgetService.delete(id);
  }

  @Get('/thesis/:thesisId')
  @ApiOperation({ summary: 'Listar presupuestos por ID de tesis' })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiResponse({
    status: 200,
    description: 'Presupuestos encontrados',
    type: [ResponseThesisBudgetDTO],
  })
  async findByThesisId(
    @Param('thesisId') thesisId: number,
  ): Promise<ResponseThesisBudgetDTO[] | null> {
    return this._thesisBudgetService.findByThesisId(thesisId);
  }

  @Get('/thesis/:thesisId/budget/:budgetId')
  @ApiOperation({
    summary: 'Obtener un presupuesto por ID de tesis y presupuesto',
  })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiParam({ name: 'budgetId', description: 'ID del presupuesto' })
  @ApiResponse({
    status: 200,
    description: 'Presupuesto encontrado',
    type: ResponseThesisBudgetDTO,
  })
  async findByThesisAndBudget(
    @Param('thesisId') thesisId: number,
    @Param('budgetId') budgetId: number,
  ): Promise<ResponseThesisBudgetDTO | null> {
    return this._thesisBudgetService.findByThesisAndBudget(thesisId, budgetId);
  }

  @Patch(':id/approval')
  @ApiOperation({
    summary: 'Actualizar estado de aprobación de un presupuesto',
  })
  @ApiParam({ name: 'id', description: 'ID del presupuesto' })
  @ApiQuery({
    name: 'approved',
    description: 'Estado de aprobación (true/false)',
    type: Boolean,
  })
  @ApiResponse({ status: 200, description: 'Estado de aprobación actualizado' })
  async updateApprovalStatus(
    @Param('id') id: number,
    @Query('approved') approved: boolean,
  ): Promise<void> {
    return this._thesisBudgetService.updateApprovalStatus(id, approved);
  }

  @Get('/thesis/:thesisId/total')
  @ApiOperation({ summary: 'Obtener monto total de presupuesto por tesis' })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiResponse({
    status: 200,
    description: 'Monto total del presupuesto',
    type: Number,
  })
  async getTotalAmountByThesisId(
    @Param('thesisId') thesisId: number,
  ): Promise<number> {
    return this._thesisBudgetService.getTotalAmountByThesisId(thesisId);
  }

  @Delete('/thesis/:thesisId')
  @ApiOperation({
    summary: 'Eliminar todos los presupuestos asociados a una tesis',
  })
  @ApiParam({ name: 'thesisId', description: 'ID de la tesis' })
  @ApiResponse({ status: 204, description: 'Presupuestos eliminados' })
  async deleteByThesisId(@Param('thesisId') thesisId: number): Promise<void> {
    return this._thesisBudgetService.deleteByThesisId(thesisId);
  }
}
