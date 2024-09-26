import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Notification } from '../notification/notification.entity'; // Importação correta

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  id_tipo_usuario: number;

  @Column()
  telefone: string;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[]; // Relacionamento entre usuários e notificações
}
