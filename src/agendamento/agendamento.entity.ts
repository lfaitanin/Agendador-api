import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Agendamentos {
  @PrimaryGeneratedColumn()
  id_agendamento: number;

  @Column()
  id_unidade: number;

  @Column()
  id_solicitante: number;

  @Column()
  id_solicitado: number;

  @Column()
  data_plantao: Date;

  @Column()
  valor: number;
}
