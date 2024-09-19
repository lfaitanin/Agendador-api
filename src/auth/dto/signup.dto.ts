import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres!' })
  senha: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Tipo de profissional tem que ser selecionado!' })
  id_tipo_usuario: number;

  @IsNotEmpty()
  @MinLength(14, { message: 'Telefone não informado!' })
  telefone: string;
}
