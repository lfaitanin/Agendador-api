import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post('Criar')
  create(@Body() createServicoDto: CreateServicoDto) {
    console.log(createServicoDto);
    return this.servicosService.create(createServicoDto);
  }

  @Get()
  findAll() {
    return this.servicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: CreateServicoDto) {
    return this.servicosService.update(+id, updateServicoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  }
}
