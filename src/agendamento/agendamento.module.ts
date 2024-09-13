import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamentos } from './agendamento.entity';
import { Unidade } from '../unidade/unidade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamentos]),
    TypeOrmModule.forFeature([Unidade]),
  ],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}
