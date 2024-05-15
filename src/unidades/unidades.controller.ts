import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnidadeService } from './unidades.service';
import { CreateUnidadesDto } from './dto/create-unidade.dto';

@Controller('unidade')
export class UnidadeController {
  constructor(private readonly agendamentoService: UnidadeService) {}

  @Post('Criar')
  create(@Body() createAgendamentoDto: CreateUnidadesDto) {
    console.log(createAgendamentoDto);
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Get()
  findAll() {
    return this.agendamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: CreateUnidadesDto,
  ) {
    return this.agendamentoService.update(+id, updateAgendamentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendamentoService.remove(+id);
  }
}
