import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamentos } from './agendamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamentos])],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}
