import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamentoDto {
  @ApiProperty()
  data_plantao: Date;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  id_solicitante: number;
  @ApiProperty()
  id_solicitado: number;
  @ApiProperty()
  id_unidade: number;
}
