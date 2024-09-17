import {
  Controller,
  Get,
  // Post,
  // Body,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
// import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  // @Post('Criar')
  // create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
  //   console.log(createAgendamentoDto);
  //   return this.agendamentoService.create(createAgendamentoDto);
  // }

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
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.agendamentoService.getFinancialData(userId, month, year);
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
}
