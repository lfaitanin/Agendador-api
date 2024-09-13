import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UnidadeUsuario } from '../unidade-usuario/unidade-usuario.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column()
  id_tipo_usuario: number;

  @OneToMany(() => UnidadeUsuario, (unidadeUsuario) => unidadeUsuario.user)
  unidadeUsuarios: UnidadeUsuario[];
}
