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
  async create(createAgendamentoDto: CreateAgendamentoDto) {
    // const agendamentoExist = await this.agendamentosRepository.findOneBy({
    //   valor: createAgendamentoDto.valor,
    //   id_solicitado: createAgendamentoDto.id_solicitado,
    //   id_solicitante: createAgendamentoDto.id_solicitante,
    //   id_unidade: createAgendamentoDto.id_unidade,
    //   data_plantao: createAgendamentoDto.data_plantao,
    // });

    // if (agendamentoExist) return 'Ja foi criado previamente';

    const saved = await this.agendamentosRepository.save(createAgendamentoDto);
    return saved;
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

  // findOne(id_agendamento: number) {
  //   return this.agendamentosRepository.findOneBy({ id_agendamento });
  // }

  // async update(
  //   id_agendamento: number,
  //   updateAgendamentoDto: CreateAgendamentoDto,
  // ) {
  //   const AgendamentoExistente = await this.agendamentosRepository.findOne({
  //     where: { id_agendamento },
  //   });

  //   return this.agendamentosRepository.save({
  //     ...AgendamentoExistente,
  //     ...updateAgendamentoDto,
  //   });
  // }

  async remove(id: number) {
    await this.agendamentosRepository.delete(id);
  }
  async getFinancialData(userId: number, month: number, year: number) {
    const despesas = await this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .select('unidade.nomeFantasia', 'unidade')
      .addSelect('SUM(agendamento.valor)', 'valorTotal')
      .addSelect('COUNT(agendamento.id_agendamento)', 'transacoes')
      .leftJoin('agendamento.unidade', 'unidade')
      .where('agendamento.usuario_dono = :userId', { userId })
      .andWhere('EXTRACT(MONTH FROM agendamento.data_plantao) = :month', {
        month,
      })
      .andWhere('EXTRACT(YEAR FROM agendamento.data_plantao) = :year', { year })
      .groupBy('unidade.nomeFantasia')
      .getRawMany();

    const receitas = await this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .select('unidade.nomeFantasia', 'unidade')
      .addSelect('SUM(agendamento.valor)', 'valorTotal')
      .addSelect('COUNT(agendamento.id_agendamento)', 'transacoes')
      .leftJoin('agendamento.unidade', 'unidade')
      .where('agendamento.beneficiado = :userId', { userId })
      .andWhere('EXTRACT(MONTH FROM agendamento.data_plantao) = :month', {
        month,
      })
      .andWhere('EXTRACT(YEAR FROM agendamento.data_plantao) = :year', { year })
      .groupBy('unidade.nomeFantasia')
      .getRawMany();

    return { despesas, receitas };
  }

  async getAvailableShifts(
    selectedDate: string,
    unidadeId: number,
  ): Promise<Agendamentos[]> {
    return this.agendamentosRepository
      .createQueryBuilder('agendamento')
      .where('agendamento.data_plantao = :selectedDate', { selectedDate })
      .andWhere('agendamento.id_solicitante IS NULL') // Plantões sem solicitante
      .andWhere('agendamento.id_unidade = :unidadeId', { unidadeId }) // Filtrar pela unidade
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
