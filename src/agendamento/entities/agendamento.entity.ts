// export class Agendamento {
//   data_reserva: Date;
//   custo: Float32Array;
//   id_servico: Int16Array;
//   id_unidade: Int16Array;
// }
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agendamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  custo: number;

  @Column()
  id_servico: number;

  @Column()
  id_unidade: number;
}
