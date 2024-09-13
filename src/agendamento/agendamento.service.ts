// import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamentos } from './agendamento.entity';
import { Unidade } from '../unidade/unidade.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamentos)
    private agendamentosRepository: Repository<Agendamentos>,
    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}
  // async create(createAgendamentoDto: CreateAgendamentoDto) {
  //   const agendamentoExist = await this.agendamentosRepository.findOneBy({
  //     valor: createAgendamentoDto.valor,
  //     id_solicitado: createAgendamentoDto.id_solicitado,
  //     id_solicitante: createAgendamentoDto.id_solicitante,
  //     id_unidade: createAgendamentoDto.id_unidade,
  //     data_plantao: createAgendamentoDto.data_plantao,
  //   });

  //   if (agendamentoExist) return 'Ja foi criado previamente';

  //   const saved = await this.agendamentosRepository.save(createAgendamentoDto);
  //   return saved;
  // }

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
      .where('agendamento.solicitante = :userId', { userId })
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
      .where('agendamento.solicitado = :userId', { userId })
      .andWhere('EXTRACT(MONTH FROM agendamento.data_plantao) = :month', {
        month,
      })
      .andWhere('EXTRACT(YEAR FROM agendamento.data_plantao) = :year', { year })
      .groupBy('unidade.nomeFantasia')
      .getRawMany();

    return { despesas, receitas };
  }
  async getHospitals() {
    const hospitals = await this.unidadeRepository.find();
    return hospitals.map((hospital) => ({
      id: hospital.id,
      nomeFantasia: hospital.nomeFantasia,
    }));
  }
}
