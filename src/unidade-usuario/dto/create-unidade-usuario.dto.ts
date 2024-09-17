import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUnidadeUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsNumber()
  @IsNotEmpty()
  id_unidade: number;
}
