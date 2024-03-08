import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty()
  nome: string;
  @ApiProperty()
  descricao: string;
}
