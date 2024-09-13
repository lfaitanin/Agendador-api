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
}
