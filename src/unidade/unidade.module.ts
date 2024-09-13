import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeService } from './unidade.service';
import { UnidadeController } from './unidade.controller';
import { Unidade } from './unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unidade])],
  providers: [UnidadeService],
  controllers: [UnidadeController],
})
export class UnidadeModule {}
