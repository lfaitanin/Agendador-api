import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: 'postgresql://agendador:LEw3b4nmPGCIqdNW5VNP6JQWJLOMiaaQ@dpg-cs9igbrqf0us739gorn0-a.oregon-postgres.render.com/agendador',
        synchronize: true,
        ssl: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
