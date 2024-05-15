import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Unidades {
  @PrimaryGeneratedColumn()
  id_unidade: number;

  @Column()
  nome_hospital: string;

  @Column()
  endereco: string;
}
