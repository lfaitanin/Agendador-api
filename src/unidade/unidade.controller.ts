import { Controller, Post, Get } from '@nestjs/common';
import { UnidadeService } from './unidade.service';

@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post('carregar-csv')
  async carregarCSV(): Promise<void> {
    await this.unidadeService.carregarDadosCSV();
  }
  @Get('nomes-fantasia')
  async getNomesFantasia() {
    return await this.unidadeService.getNomesFantasia();
  }

  @Get()
  findAll() {
    return this.unidadeService.findAll();
  }
}
