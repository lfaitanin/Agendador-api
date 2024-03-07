import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicos } from './entities/servicos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicos])],
  controllers: [ServicosController],
  providers: [ServicosService],
  exports: [TypeOrmModule],
})
export class ServicosModule {}
