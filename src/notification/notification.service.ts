import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from '../user/user.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Criar uma nova notificação
  async createNotification(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { title, message, userId, actionLink, type, priority } = createNotificationDto;

    const user = await this.userRepository.findOne({ where: { id_usuario: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newNotification = this.notificationRepository.create({
        title: 'Nova Notificação',
        message: 'Você tem um novo plantão.',
        user: { id_usuario: userId }, // Aqui estamos referenciando o ID do usuário
      });

      return this.notificationRepository.save(newNotification);
  }

  // Buscar notificações de um usuário
  async findNotificationsByUser(userId: number): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { user: { id_usuario: userId } },
      order: { createdAt: 'DESC' },
      take: 10, // Limita o número de notificações retornadas para 10
    });
  }

  // Marcar notificação como lida
  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new NotFoundException('Notificação não encontrada');
    }

    notification.isRead = true;
    notification.readAt = new Date(); // Atualiza a data de leitura
    return this.notificationRepository.save(notification);
  }
}
