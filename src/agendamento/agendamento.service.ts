// import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamentos } from './agendamento.entity';
import { Unidade } from '../unidade/unidade.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamentos)
    private agendamentosRepository: Repository<Agendamentos>,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}

  async create(
    createAgendamentoDto: CreateAgendamentoDto,
  ): Promise<Agendamentos> {
    const agendamento = this.agendamentosRepository.create({
      ...createAgendamentoDto,
    });

    return this.agendamentosRepository.save(agendamento);
  }

  // Buscar próximo plantão
  async getProximoPlantao(userId: number): Promise<Agendamentos> {
    return await this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .where(
        'agendamento.id_solicitado = :userId OR agendamento.id_solicitante = :userId',
        { userId },
      )
      .andWhere('agendamento.data_plantao > CURRENT_DATE')
      .orderBy('agendamento.data_plantao', 'ASC')
      .getOne();
  }

  // Buscar últimos 5 plantões já realizados (histórico)
  async getHistoricoPlantao(userId: number): Promise<Agendamentos[]> {
    return await this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .where(
        'agendamento.id_solicitado = :userId OR agendamento.id_solicitante = :userId',
        { userId },
      )
      .andWhere('agendamento.data_plantao < CURRENT_DATE')
      .orderBy('agendamento.data_plantao', 'DESC')
      .limit(5)
      .getMany();
  }
  findAll() {
    return this.agendamentosRepository.find();
  }

  async remove(id: number) {
    await this.agendamentosRepository.delete(id);
  }

  async getFinancialData(
    userId: number,
    startDate: string,
    endDate: string,
    unidadeIds: number[],
  ) {
    const queryDespesas = this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .select('unidade.nomeFantasia', 'unidade')
      .addSelect('SUM(agendamento.valor)', 'valorTotal')
      .addSelect('COUNT(agendamento.id_agendamento)', 'transacoes')
      .leftJoin('agendamento.unidade', 'unidade')
      .where('agendamento.id_usuario_dono = :userId', { userId })
      .andWhere('id_usuario_beneficiado is not null')
      .andWhere('agendamento.data_plantao BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    if (unidadeIds.length > 0) {
      queryDespesas.andWhere('agendamento.id_unidade IN (:...unidadeIds)', {
        unidadeIds,
      });
    }
    const despesas = await queryDespesas
      .groupBy('unidade.nomeFantasia')
      .getRawMany();

    const queryReceitas = this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .select('unidade.nomeFantasia', 'unidade')
      .addSelect('SUM(agendamento.valor)', 'valorTotal')
      .addSelect('COUNT(agendamento.id_agendamento)', 'transacoes')
      .leftJoin('agendamento.unidade', 'unidade')
      .where('agendamento.id_usuario_beneficiado = :userId', { userId })
      .andWhere('agendamento.data_plantao BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    // Filtrar receitas pelas unidades se aplicável
    if (unidadeIds.length > 0) {
      queryReceitas.andWhere('agendamento.id_unidade IN (:...unidadeIds)', {
        unidadeIds,
      });
    }
    const receitas = await queryReceitas
      .groupBy('unidade.nomeFantasia')
      .getRawMany();

    return { despesas, receitas };
  }

  async getAvailableShifts(date: string, unidadeId: number) {
    return this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .select([
        'agendamento.id_agendamento',
        'agendamento.data_plantao',
        'agendamento.valor',
        'user.nome AS nome_usuario_dono',
        'unidade.nomeFantasia AS nome_unidade',
      ])
      .leftJoin('agendamento.usuario_dono', 'user') // Junta com a tabela user
      .leftJoin('agendamento.unidade', 'unidade') // Junta com a tabela unidade
      .where('agendamento.data_plantao = :date', { date })
      .andWhere('agendamento.id_unidade = :unidadeId', { unidadeId })
      .getRawMany();
  }

  async getAvailableShiftsByDate(
    selectedDate: string,
  ): Promise<Agendamentos[]> {
    return this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .where('agendamento.data_plantao = :selectedDate', { selectedDate })
      .andWhere('agendamento.id_usuario_beneficiado IS NULL') // Plantões sem solicitante
      .getMany();
  }

  async getAvailableShiftsByUnit(
    unidadeId: number,
  ): Promise<Agendamentos[]> {
    return this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .where('agendamento.id_unidade = :unidadeId', { unidadeId }) // Filtrar pela unidade
      .andWhere('agendamento.id_usuario_beneficiado IS NULL') // Plantões sem solicitante
      .andWhere("agendamento.data_plantao BETWEEN now()::date and now()::date + interval '365 days'")
      .getMany();
  }

  async getHospitals() {
    const hospitals = await this.unidadeRepository.find();
    return hospitals.map((hospital) => ({
      id: hospital.id,
      nomeFantasia: hospital.nomeFantasia,
    }));
  }
}
