import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index, // Importa o Index para definir os índices
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('notifications')
@Index(['createdAt', 'userId']) // Define um índice composto para createdAt e userId
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  @Index() // Cria um índice separado na coluna 'createdAt'
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  readAt: Date;

  @Column({ nullable: true })
  actionLink: string;

  @Column({ default: 'info' })
  type: string;

  @Column({ default: 'normal' })
  priority: string;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' }) // Define o nome da coluna como 'userId'
  user: User;

  @Column()
  @Index() // Cria um índice separado na coluna 'userId'
  userId: number; // Armazena diretamente o ID do usuário
}
