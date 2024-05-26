import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
class User {
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
}

export default User;
