import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { User } from '../user/user.entity';
import { Agendamentos } from 'src/agendamento/agendamento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, User, Agendamentos])
    ],
    providers: [NotificationService],
    controllers: [NotificationController],
})
export class NotificationModule { }
