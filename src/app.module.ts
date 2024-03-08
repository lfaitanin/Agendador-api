import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ServicosModule } from './servicos/servicos.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { Servicos } from './servicos/entities/servicos.entity';
import { Agendamentos } from './agendamento/entities/agendamento.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ServicosModule,
    AgendamentoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_HOST,
      // url: ConfigService.get('FOO'),
      entities: [Servicos, Agendamentos],
      synchronize: true,
      schema: 'appminio',
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
