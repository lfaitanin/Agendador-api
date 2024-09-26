import { Module } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamentos } from './agendamento.entity';
import { Unidade } from '../unidade/unidade.entity';
import { Notification } from 'src/notification/notification.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamentos]),
    TypeOrmModule.forFeature([Unidade]),
    TypeOrmModule.forFeature([Notification]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}
