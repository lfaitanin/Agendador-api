import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UnidadeUsuarioService } from './unidade-usuario.service';
import { CreateUnidadeUsuarioDto } from './dto/create-unidade-usuario.dto';
import { UnidadeUsuario } from './unidade-usuario.entity';

@Controller('unidade-usuario')
export class UnidadeUsuarioController {
  constructor(private readonly unidadeUsuarioService: UnidadeUsuarioService) {}

  @Post('Criar')
  create(@Body() createAgendamentoDto: CreateUnidadeUsuarioDto) {
    console.log(createAgendamentoDto);
    return this.unidadeUsuarioService.create(createAgendamentoDto);
  }

  @Get(':id')
  findByUserId(@Param('id') id_usuario: string) {
    return this.unidadeUsuarioService.findByUserId(+id_usuario);
  }

  @Put('/update/:id_unidade/:id_usuario')
  async update(
    @Param('id_unidade') id_unidade: number,
    @Param('id_usuario') id_usuario: number,
    @Body() updateUnidadeUsuarioDto: CreateUnidadeUsuarioDto,
  ): Promise<UnidadeUsuario> {
    return this.unidadeUsuarioService.update(
      id_unidade,
      id_usuario,
      updateUnidadeUsuarioDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadeUsuarioService.remove(+id);
  }
  @Get('usuario/:userId')
  async getUnidadesByUsuario(@Param('userId') userId: number) {
    return await this.unidadeUsuarioService.getUnidadesByUsuario(userId);
  }
}
