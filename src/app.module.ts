import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
// import { UnidadesModule } from './unidades/unidades.module';
@Module({
  imports: [
    AgendamentoModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '5.189.147.176',
      port: 32768,
      password: '123456789',
      username: 'lportainer',
      database: 'public',
      synchronize: true,
      logging: true,
    }),
    // UnidadesModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
