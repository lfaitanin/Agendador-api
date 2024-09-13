import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UnidadeUsuario } from '../unidade-usuario/unidade-usuario.entity';

@Entity()
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeFantasia: string;

  @Column()
  razaoSocial: string;

  @Column()
  cnpj: string;

  @Column()
  atendeSus: boolean;

  @Column()
  atendeConvenio: boolean;

  @OneToMany(() => UnidadeUsuario, (unidadeUsuario) => unidadeUsuario.unidade)
  unidadeUsuarios: UnidadeUsuario[];
}
