import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { randomInt } from 'crypto';
import { SendVerificationCodeDto } from 'src/user/dto/send-verification-code.dto';
import * as nodemailer from 'nodemailer';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

// Configurações de envio de e-mail
const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'euzelador@outlook.com',
    pass: 'Euzelo!23', // Certifique-se de usar variáveis de ambiente para senhas
  },
});

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache, // Cache injetado
  ) { }

  // Função para armazenar o código de verificação no cache
  async setCache(userId: number, value: string) {
    await this.cacheManager.set(`user_${userId}`, value, 60000);
  }

  // Função para buscar o código de verificação no cache
  async getCache(userId: number) {
    return await this.cacheManager.get(`user_${userId}`);
  }

  // Função para enviar o código de verificação por e-mail e telefone
  async sendVerificationCode(sendVerificationCodeDto: SendVerificationCodeDto) {
    const { email } = sendVerificationCodeDto;

    // Verifica se o usuário existe
    const user = await this.usersRepository.findOne({ where: { email: sendVerificationCodeDto.email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Gera um código de verificação de 6 dígitos
    const verificationCode = randomInt(100000, 999999).toString();

    // Armazena o código no cache por 60 segundos
    await this.setCache(user.id_usuario, verificationCode);

    // Configura o e-mail a ser enviado
    const mailOptions = {
      from: 'euzelador@outlook.com',
      to: email,
      subject: '[Shift] Seu código de verificação',
      text: `Seu código de verificação é: ${verificationCode}`,
    };

    // Tenta enviar o e-mail
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Código de verificação enviado para ${email}`);
    } catch (error) {
      console.error(`Erro ao enviar e-mail: ${error.message}`);
      throw new Error('Erro ao enviar o código de verificação por e-mail');
    }

    // Aqui você pode integrar com um serviço de SMS como Twilio, Nexmo, etc.
    // Exemplo de envio usando Twilio (não implementado aqui):
    // await this.twilioService.sendSMS(phone, `Seu código de verificação é: ${verificationCode}`);

    return { message: 'Código de verificação enviado para o e-mail e telefone' };
  }

  // Função para confirmar o código de verificação
  async confirmVerificationCode(email: string, code: string): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const storedCode = await this.getCache(user.id_usuario);
    if (storedCode === code) {
      // Código correto, remove do cache
      await this.cacheManager.del(`user_${user.id_usuario}`);
      const token = this.jwtService.sign({ id: user.id_usuario });
      return { token };
    } else {
      throw new UnauthorizedException('Código de verificação incorreto');
    }
  }

  // Função para cadastrar o usuário
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { nome, email, senha, telefone, id_tipo_usuario } = signUpDto;

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await this.usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
      telefone,
      id_tipo_usuario,
    });

    await this.usersRepository.save(user);

    // Enviar o código de verificação para o e-mail e telefone
    await this.sendVerificationCode({ email: user.email, userId: user.id_usuario, phone: user.telefone });

    return user;
  }

  // Função de login
  async login(loginDto: LoginDto): Promise<{ token: string; user: { id: number; name: string } }> {
    const { email, senha } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordMatched = await bcrypt.compare(senha, user.senha);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const token = this.jwtService.sign({ id: user.id_usuario });
    return {
      token,
      user: {
        id: user.id_usuario,
        name: user.nome,
      },
    };
  }
}
