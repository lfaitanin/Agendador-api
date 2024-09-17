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
  constructor(private readonly agendamentoService: AgendamentoService) { }

  // @Post('Criar')
  // create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
  //   console.log(createAgendamentoDto);
  //   return this.agendamentoService.create(createAgendamentoDto);
  // }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
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
    const unidadeIdArray = unidadeIds ? unidadeIds.split(',').map(id => Number(id)) : []; // Converte a string para array de números
    return this.agendamentoService.getFinancialData(userId, startDate, endDate, unidadeIdArray);
  }
  @Get('hospitals')
  async getHospitals() {
    return this.agendamentoService.getHospitals();
  }
}
