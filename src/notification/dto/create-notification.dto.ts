import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  actionLink?: string; // Link para uma ação, opcional

  @IsOptional()
  @IsString()
  type?: string; // Tipo de notificação (info, warning, etc.), opcional

  @IsOptional()
  @IsString()
  priority?: string; // Prioridade da notificação (normal, high, etc.), opcional
}
