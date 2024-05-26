import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicos')
export class Servicos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  descricao: string;
}
