import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Unidade } from '../unidade/unidade.entity';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity()
export class Agendamentos {
  @PrimaryGeneratedColumn()
  id_agendamento: number;

  @ManyToOne(() => Unidade, (unidade) => unidade.id)
  @JoinColumn({ name: 'id_unidade' })
  unidade: Unidade;

  @ManyToOne(() => User, (user) => user.id_usuario)
  @JoinColumn({ name: 'id_usuario_dono' })
  usuario_dono: User;

  @ManyToOne(() => User, (user) => user.id_usuario)
  @JoinColumn({ name: 'id_usuario_beneficiado' })
  usuario_beneficiado: User;

  @Column()
  data_plantao: Date;

  @Column('numeric', {
    precision: 35,
    scale: 3,
    transformer: new ColumnNumericTransformer(),
  })
  valor: number;
}
