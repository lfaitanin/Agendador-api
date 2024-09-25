import { Body, Controller, Get, NotFoundException, Post, Query, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto, VerificationCodeDto } from './dto/signup.dto';
import { User } from 'src/user/user.entity';
import { SendVerificationCodeDto } from 'src/user/dto/send-verification-code.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('check-email')
  async checkEmail(@Query('email') email: string): Promise<{ exists: boolean }> {
    const user = await this.usersService.findByEmail(email);
    return { exists: !!user };
  }

  @Post('/confirm-code')
  async confirmCode(@Body() verificationCode: VerificationCodeDto, @Res() res: Response): Promise<Response> {
    try {
      const token = await this.authService.confirmVerificationCode(verificationCode.email, verificationCode.code);
      return res.status(200).json({ token }); // Retornar 200 em caso de sucesso
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({ message: 'Código de verificação incorreto' });
      } else if (error instanceof NotFoundException) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }


  @Post('/send-confirmation-code')
  async sendConfirmationCode(@Body() verificationCode: SendVerificationCodeDto): Promise<boolean> {
    await this.authService.sendVerificationCode(verificationCode);
    return true;
  }
}
