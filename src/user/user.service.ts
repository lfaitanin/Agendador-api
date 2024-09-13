import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save({
      name: createUserDto.nome,
      email: createUserDto.email,
      password: createUserDto.senha,
      id_tipo_usuario: createUserDto.id_tipo_usuario,
    });
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
}
