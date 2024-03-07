import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamentos } from './entities/agendamento.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamentos)
    private agendamentosRepository: Repository<Agendamentos>,
  ) {}
  async create(createAgendamentoDto: CreateAgendamentoDto) {
    const agendamentoExist = await this.agendamentosRepository.findOneBy({
      custo: createAgendamentoDto.custo,
      id_servico: createAgendamentoDto.id_servico,
      id_unidade: createAgendamentoDto.id_unidade,
    });

    if (agendamentoExist) return 'Ja foi criado previamente';

    const saved = await this.agendamentosRepository.save(createAgendamentoDto);
    return saved;
  }

  findAll() {
    return this.agendamentosRepository.find();
  }

  findOne(id: number) {
    return this.agendamentosRepository.findOneBy({ id });
  }

  async update(id: number, updateAgendamentoDto: UpdateAgendamentoDto) {
    const AgendamentoExistente = await this.agendamentosRepository.findOne({
      where: { id },
    });

    return this.agendamentosRepository.save({
      ...AgendamentoExistente,
      ...updateAgendamentoDto,
    });
  }

  async remove(id: number) {
    await this.agendamentosRepository.delete(id);
  }
}
