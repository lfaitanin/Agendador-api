import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Unidade } from '../../unidade/unidade.entity'; // Exemplo de relação com unidade

export class MeusAgendamentosDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_usuario_dono: number; // Referência ao dono do plantão

  @Column()
  agendamento_data_plantao: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  agendamento_valor: number;

  @ManyToOne(() => Unidade, unidade => unidade.nomeFantasia)
  unidade: Unidade;
}
