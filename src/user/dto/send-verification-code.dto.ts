// src/users/dto/send-verification-code.dto.ts
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendVerificationCodeDto {
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR') // Valida números de telefone do Brasil
  phone: string;
}