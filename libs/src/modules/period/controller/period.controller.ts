import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import {
  IPeriodService,
  PERIOD_SERVICE_KEY,
} from '../contracts/period.service';
import { CreatePeriodDTO } from '../dto/create-period.dto';
import { UpdatePeriodDTO } from '../dto/update-period.dto';
import { ResponsePeriodDTO } from '../dto/response-period.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Periods')
@Controller('periods')
export class PeriodController {
  constructor(
    @Inject(PERIOD_SERVICE_KEY)
    private readonly _periodService: IPeriodService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo periodo' })
  @ApiBody({ type: CreatePeriodDTO })
  @ApiResponse({
    status: 201,
    description: 'Periodo creado correctamente',
    type: ResponsePeriodDTO,
  })
  async createPeriod(
    @Body() data: CreatePeriodDTO,
  ): Promise<ResponsePeriodDTO> {
    return await this._periodService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un periodo existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdatePeriodDTO })
  @ApiResponse({
    status: 200,
    description: 'Periodo actualizado correctamente',
    type: ResponsePeriodDTO,
  })
  async updatePeriod(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePeriodDTO,
  ): Promise<ResponsePeriodDTO> {
    return await this._periodService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un periodo por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Periodo eliminado correctamente' })
  async deletePeriod(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._periodService.delete(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los periodos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de periodos',
    type: [ResponsePeriodDTO],
  })
  async getAllPeriods(): Promise<ResponsePeriodDTO[]> {
    return await this._periodService.getAll();
  }

  @Get('by-period/:periodConcat')
  @ApiOperation({
    summary: 'Buscar periodo por string concatenado (ej: 2025-I)',
  })
  @ApiParam({
    name: 'periodConcat',
    type: String,
    description: 'Valor concatenado del periodo (ej: "2025-I")',
  })
  @ApiResponse({
    status: 200,
    description: 'Periodo encontrado',
    type: ResponsePeriodDTO,
  })
  async getByPeriod(
    @Param('periodConcat') periodConcat: string,
  ): Promise<ResponsePeriodDTO> {
    return await this._periodService.findByPeriod(periodConcat);
  }
}
