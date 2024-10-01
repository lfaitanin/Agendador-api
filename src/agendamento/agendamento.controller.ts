import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { PegarPlantaoDto } from './dto/pegar-plantao.dto';
import { Response } from 'express';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    console.log(createAgendamentoDto);

    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }
  @Get('proximo/:userId')
  async getProximoPlantao(@Param('userId') userId: number) {
    return await this.agendamentoService.getProximoPlantao(userId);
  }

  // Endpoint para buscar o histórico dos últimos 5 plantões
  @Get('historico/:userId')
  async getHistoricoPlantao(@Param('userId') userId: number) {
    return await this.agendamentoService.getHistoricoPlantao(userId);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.agendamentoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAgendamentoDto: CreateAgendamentoDto,
  // ) {
  //   return this.agendamentoService.update(+id, updateAgendamentoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamentoService.remove(+id);
  }
  @Get('financeiro/:userId')
  async getFinancialData(
    @Param('userId') userId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('unidadeIds') unidadeIds: string, // Recebe os IDs das unidades ou 'todas'
  ) {
    const unidadeIdArray = unidadeIds
      ? unidadeIds.split(',').map((id) => Number(id))
      : []; // Converte a string para array de números
    return this.agendamentoService.getFinancialData(
      userId,
      startDate,
      endDate,
      unidadeIdArray,
    );
  }
  @Get('hospitals')
  async getHospitals() {
    return this.agendamentoService.getHospitals();
  }
  // Endpoint para buscar plantões disponíveis
  @Get('disponiveis')
  async getAvailableShifts(
    @Query('date') date: string,
    @Query('unidadeId') unidadeId: number,
  ) {
    return await this.agendamentoService.getAvailableShifts(date, unidadeId);
  }
  @Get('disponiveis-by-unidade')
  async getAvailableShiftsByUnidade(@Query('unidadeId') unidadeId: number) {
    return await this.agendamentoService.getAvailableShiftsByUnit(unidadeId);
  }

  // Endpoint para buscar plantões disponíveis
  @Get('disponiveis-by-date')
  async getAvailableShiftsByDate(@Query('date') date: string) {
    return await this.agendamentoService.getAvailableShiftsByDate(date);
  }

  @Get('meus-plantoes')
  async getMeusPlantoes(@Query('id_usuario') idUsuario: number) {
    const plantao = await this.agendamentoService.findPlantoesByUser(idUsuario);
    if (!plantao || plantao.length === 0) {
      throw new NotFoundException(
        'Nenhum plantão encontrado para este usuário',
      );
    }
    return plantao;
  }

  @Post('pegar-plantao')
  async pegarPlantao(
    @Body() pegarPlantaoDto: PegarPlantaoDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { id_plantao, id_usuario } = pegarPlantaoDto;

    try {
      const plantao = await this.agendamentoService.findPlantaoById(id_plantao);
      if (!plantao) {
        throw new NotFoundException('Plantão não encontrado');
      }

      if (plantao.id_usuario_beneficiado) {
        throw new BadRequestException('Este plantão não está disponível.');
      }
      const response = this.agendamentoService.pegarPlantao(
        plantao,
        id_usuario,
      );
      return res.status(200).json({ response }); // Retornar 200 em caso de sucesso
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}
