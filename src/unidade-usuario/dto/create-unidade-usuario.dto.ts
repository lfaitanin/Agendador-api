import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateUnidadeUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  id_usuario: number;

  @IsNumber()
  @IsNotEmpty()
  id_unidade: number;

  @IsNumber()
  @IsNotEmpty()
  frequencia: number;

  @IsNumber()
  @IsNotEmpty()
  duracao: number;

  @IsDate()
  @IsNotEmpty()
  primeiro_plantao: Date;
}
