import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamentoDto {
  @ApiProperty()
  data_reserva: Date;
  @ApiProperty()
  custo: number;
  @ApiProperty()
  id_servico: number;
  @ApiProperty()
  id_unidade: number;
}
