import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Get(':userId')
  async getUserNotifications(@Param('userId') userId: number) {
    return this.notificationService.findNotificationsByUser(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: number) {
    return this.notificationService.markAsRead(id);
  }
}
