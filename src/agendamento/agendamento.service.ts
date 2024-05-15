import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamentos } from './agendamento.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamentos)
    private agendamentosRepository: Repository<Agendamentos>,
  ) {}
  async create(createAgendamentoDto: CreateAgendamentoDto) {
    const agendamentoExist = await this.agendamentosRepository.findOneBy({
      valor: createAgendamentoDto.valor,
      id_solicitado: createAgendamentoDto.id_solicitado,
      id_solicitante: createAgendamentoDto.id_solicitante,
      id_unidade: createAgendamentoDto.id_unidade,
      data_plantao: createAgendamentoDto.data_plantao,
    });

    if (agendamentoExist) return 'Ja foi criado previamente';

    const saved = await this.agendamentosRepository.save(createAgendamentoDto);
    return saved;
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
}
