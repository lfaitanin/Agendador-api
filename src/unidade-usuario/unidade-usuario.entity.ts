import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Unidade } from '../unidade/unidade.entity';

@Entity()
export class UnidadeUsuario {
  @PrimaryGeneratedColumn()
  id_unidade_usuario: number;

  @ManyToOne(() => User, (user) => user.id_usuario)
  @JoinColumn({ name: 'id_usuario' })
  user: User;

  @ManyToOne(() => Unidade, (unidade) => unidade.id)
  @JoinColumn({ name: 'id_unidade' })
  unidade: Unidade;
}
