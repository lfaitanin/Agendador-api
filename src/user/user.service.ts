import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import { NotFoundException } from '@nestjs/common';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAllUsers() {
    const users = this.usersRepository.find();
    return users;
  }

  async getUserById(id_usuario: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id_usuario: id_usuario,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({
      nome: createUserDto.nome,
      email: createUserDto.email,
      senha: createUserDto.senha,
      id_tipo_usuario: createUserDto.id_tipo_usuario,
      telefone: createUserDto.telefone, // Capturando o telefone
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }


  async deleteById(id_usuario: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id_usuario: id_usuario,
      },
    });
    if (!user) {
      return null;
    }

    await this.usersRepository.remove(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
