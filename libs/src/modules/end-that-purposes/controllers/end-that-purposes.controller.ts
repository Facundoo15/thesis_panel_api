import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ENDTHATPURPOSES_SERVICE_KEY,
  IEndThatPurposesService,
} from '../contracts/end-that-purposes.service';
import { CreateEndThatPurposesDTO } from '../dto/create-end-that-purposes.dto';
import { UpdateEndThatPurposes } from '../dto/update-end-that-purposes.dto';
import { ResponseEndThatPurposes } from '../dto/response-end-that-purposes.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('End That Purposes')
@Controller('end-that-purposes')
export class EndThatPurposesController {
  constructor(
    @Inject(ENDTHATPURPOSES_SERVICE_KEY)
    private readonly _endthatPurposesService: IEndThatPurposesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo fin o propósito' })
  @ApiBody({ type: CreateEndThatPurposesDTO })
  @ApiResponse({
    status: 201,
    description: 'Propósito creado correctamente',
    type: ResponseEndThatPurposes,
  })
  async create(
    @Body() data: CreateEndThatPurposesDTO,
  ): Promise<ResponseEndThatPurposes> {
    return this._endthatPurposesService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un propósito existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEndThatPurposes })
  @ApiResponse({
    status: 200,
    description: 'Propósito actualizado correctamente',
    type: ResponseEndThatPurposes,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEndThatPurposes,
  ): Promise<ResponseEndThatPurposes> {
    return this._endthatPurposesService.update(id, data);
  }

  @Get('by-name')
  @ApiOperation({ summary: 'Buscar propósito por nombre' })
  @ApiQuery({ name: 'name', type: String })
  @ApiResponse({
    status: 200,
    description: 'Propósito encontrado',
    type: ResponseEndThatPurposes,
  })
  async findByName(
    @Query('name') name: string,
  ): Promise<ResponseEndThatPurposes> {
    return this._endthatPurposesService.findByName(name);
  }

  @Get('by-code')
  @ApiOperation({ summary: 'Buscar propósito por código' })
  @ApiQuery({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    description: 'Propósito encontrado',
    type: ResponseEndThatPurposes,
  })
  async findByCode(
    @Query('code') code: string,
  ): Promise<ResponseEndThatPurposes> {
    return this._endthatPurposesService.findByCode(code);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los propósitos' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de propósitos',
    type: [ResponseEndThatPurposes],
  })
  async findAll(): Promise<ResponseEndThatPurposes[]> {
    return this._endthatPurposesService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un propósito por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
    description: 'Propósito eliminado correctamente',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._endthatPurposesService.delete(id);
  }
}
