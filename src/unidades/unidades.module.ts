import { Module } from '@nestjs/common';
import { UnidadeService } from './unidades.service';
import { UnidadeController } from './unidades.controller';

@Module({
  controllers: [UnidadeController],
  providers: [UnidadeService],
})
export class UnidadesModule {}
