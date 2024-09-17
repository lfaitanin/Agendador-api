import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { nome, email, senha, id_tipo_usuario } = signUpDto;

    const hashedPassword = await bcrypt.hash(senha, 10);
    console.log(id_tipo_usuario);
    const user = await this.usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
      id_tipo_usuario,
    });

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id_usuario });

    return { token };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: { id: number; name: string } }> {
    const { email, senha } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(senha, user.senha);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id_usuario });
    const idUser = user.id_usuario;

    return {
      token,
      user: {
        id: user.id_usuario,
        name: user.nome,
      },
    };
  }
}
