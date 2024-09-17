import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamentoDto {
  @ApiProperty()
  data_plantao: Date;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  id_usuario_dono: number;
  @ApiProperty()
  id_usuario_beneficiado: number;
  @ApiProperty()
  id_unidade: number;
}
