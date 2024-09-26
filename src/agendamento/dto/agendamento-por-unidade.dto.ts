

import { ApiProperty } from '@nestjs/swagger';

export class AgendamentoPorUnidadeDto {
    @ApiProperty()
    data_plantao: Date;
    @ApiProperty()
    id_tipo_usuario: number;
}
