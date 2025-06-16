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
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';

import {
  RESEARCHDESIGN_SERVICE_KEY,
  IResearchDesignService,
} from '../contracts/research-design.service';
import { CreateResearchDesignDTO } from '../dto/create-research-design.dto';
import { ResponseResearchDesignDTO } from '../dto/response-research-design.dto';
import { UpdateResearchDesignDTO } from '../dto/update-research-design.dto';
@ApiTags('Research Design')
@Controller('research-design')
export class ResearchDesignController {
  constructor(
    @Inject(RESEARCHDESIGN_SERVICE_KEY)
    private readonly _researchDesignService: IResearchDesignService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear diseño de investigación' })
  @ApiBody({ type: CreateResearchDesignDTO })
  @ApiResponse({
    status: 201,
    description: 'Diseño de investigación creado',
    type: ResponseResearchDesignDTO,
  })
  async create(
    @Body() data: CreateResearchDesignDTO,
  ): Promise<ResponseResearchDesignDTO> {
    return this._researchDesignService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar diseño de investigación' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateResearchDesignDTO })
  @ApiResponse({
    status: 200,
    description: 'Diseño de investigación actualizado',
    type: ResponseResearchDesignDTO,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateResearchDesignDTO,
  ): Promise<ResponseResearchDesignDTO> {
    return this._researchDesignService.update(id, data);
  }

  @Get('by-name')
  @ApiOperation({ summary: 'Buscar diseño por nombre' })
  @ApiQuery({ name: 'name', type: String })
  @ApiResponse({
    status: 200,
    description: 'Diseño encontrado por nombre',
    type: ResponseResearchDesignDTO,
  })
  async findByName(
    @Query('name') name: string,
  ): Promise<ResponseResearchDesignDTO> {
    return this._researchDesignService.findByName(name);
  }

  @Get('by-code')
  @ApiOperation({ summary: 'Buscar diseño por código' })
  @ApiQuery({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    description: 'Diseño encontrado por código',
    type: ResponseResearchDesignDTO,
  })
  async findByCode(
    @Query('code') code: string,
  ): Promise<ResponseResearchDesignDTO> {
    return this._researchDesignService.findByCode(code);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los diseños de investigación' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los diseños',
    type: [ResponseResearchDesignDTO],
  })
  async findAll(): Promise<ResponseResearchDesignDTO[]> {
    return this._researchDesignService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar diseño de investigación por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Diseño eliminado correctamente' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this._researchDesignService.delete(id);
  }
}
