import { CreateUnidadeUsuarioDto } from './dto/create-unidade-usuario.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnidadeUsuario } from './unidade-usuario.entity';
import { User } from '../user/user.entity';
import { Unidade } from '../unidade/unidade.entity';

@Injectable()
export class UnidadeUsuarioService {
  constructor(
    @InjectRepository(UnidadeUsuario)
    private unidadeUsuarioRepository: Repository<UnidadeUsuario>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}
  async create(
    createUnidadeUsuarioDto: CreateUnidadeUsuarioDto,
  ): Promise<UnidadeUsuario> {
    const { id_usuario, id_unidade } = createUnidadeUsuarioDto;

    const user = await this.userRepository.findOne({ where: { id_usuario } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id_usuario} not found`);
    }

    const unidade = await this.unidadeRepository.findOne({
      where: { id: id_unidade },
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade with ID ${id_unidade} not found`);
    }

    const unidadeUsuario = new UnidadeUsuario();
    unidadeUsuario.user = user;
    unidadeUsuario.unidade = unidade;

    return await this.unidadeUsuarioRepository.save(unidadeUsuario);
  }

  async findByUserId(id_usuario: number): Promise<any[]> {
    const unidades = await this.unidadeUsuarioRepository.find({
      where: { user: { id_usuario } },
      relations: ['unidade'],
    });

    return unidades.map((unidadeUsuario) => ({
      id_unidade: unidadeUsuario.unidade.id,
      nomeFantasia: unidadeUsuario.unidade.nomeFantasia,
    }));
  }

  async update(
    id_unidade: number,
    id_usuario: number,
    updateUnidadeUsuarioDto: CreateUnidadeUsuarioDto,
  ): Promise<UnidadeUsuario> {
    const agendamentoExistente = await this.unidadeUsuarioRepository.findOne({
      where: { user: { id_usuario }, unidade: { id: id_unidade } },
      relations: ['user', 'unidade'],
    });

    if (!agendamentoExistente) {
      throw new NotFoundException('Unidade não encontrado');
    }

    const updatedAgendamento = {
      ...agendamentoExistente,
      ...updateUnidadeUsuarioDto,
    };

    return this.unidadeUsuarioRepository.save(updatedAgendamento);
  }

  async remove(id: number) {
    await this.unidadeUsuarioRepository.delete(id);
  }

  async getUnidadesByUsuario(userId: number) {
    return this.unidadeUsuarioRepository
      .createQueryBuilder('unidadeUsuario')
      .innerJoinAndSelect('unidadeUsuario.unidade', 'unidade')
      .where('unidadeUsuario.id_usuario = :userId', { userId })
      .select(['unidade.id', 'unidade.nomeFantasia']) // Seleciona o nomeFantasia
      .getMany();
  }
}
