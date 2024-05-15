import { CreateUnidadesDto } from './dto/create-unidade.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidades } from './unidade.entity';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidades)
    private unidadesRepository: Repository<Unidades>,
  ) {}
  async create(createAgendamentoDto: CreateUnidadesDto) {
    const unidadeExist = await this.unidadesRepository.findOneBy({
      endereco: createAgendamentoDto.endereco,
      nome_hospital: createAgendamentoDto.nome_hospital,
    });
    if (unidadeExist) return 'Ja foi criado previamente';

    const saved = await this.unidadesRepository.save(createAgendamentoDto);
    return saved;
  }

  findAll() {
    return this.unidadesRepository.find();
  }

  findOne(id_unidade: number) {
    return this.unidadesRepository.findOneBy({ id_unidade });
  }

  async update(id_unidade: number, updateAgendamentoDto: CreateUnidadesDto) {
    const AgendamentoExistente = await this.unidadesRepository.findOne({
      where: { id_unidade },
    });

    return this.unidadesRepository.save({
      ...AgendamentoExistente,
      ...updateAgendamentoDto,
    });
  }

  async remove(id: number) {
    await this.unidadesRepository.delete(id);
  }
}
