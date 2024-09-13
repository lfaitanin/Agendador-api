import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeUsuarioService } from './unidade-usuario.service';
import { UnidadeUsuarioController } from './unidade-usuario.controller';
import { UnidadeUsuario } from './unidade-usuario.entity';
import { User } from '../user/user.entity';
import { Unidade } from '../unidade/unidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeUsuario, User, Unidade])],
  providers: [UnidadeUsuarioService],
  controllers: [UnidadeUsuarioController],
})
export class UnidadeUsuarioModule {}
