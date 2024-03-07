import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ServicosModule } from './servicos/servicos.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { Servicos } from './servicos/entities/servicos.entity';
import { Agendamentos } from './agendamento/entities/agendamento.entity';

@Module({
  imports: [
    ServicosModule,
    AgendamentoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres.vbdvaybfhevvchtgtvgw:EuZeloBD%2323%21@aws-0-sa-east-1.pooler.supabase.com:5432/appminio?schema=appminio',
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
