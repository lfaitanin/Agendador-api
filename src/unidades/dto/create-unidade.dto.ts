import { ApiProperty } from '@nestjs/swagger';

export class CreateUnidadesDto {
  @ApiProperty()
  nome_hospital: string;
  @ApiProperty()
  endereco: string;
}
