import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UnidadeUsuarioModule } from './unidade-usuario/unidade-usuario.module';
import { UnidadeModule } from './unidade/unidade.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AgendamentoModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    UnidadeUsuarioModule,
    UnidadeModule,
    NotificationModule,
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 60, // O TTL de 60 segundos
      max: 10000, // Limite máximo de objetos armazenados
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'password',
      username: 'postgres',
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
