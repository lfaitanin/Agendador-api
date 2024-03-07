import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicos } from './entities/servicos.entity';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servicos)
    private servicosRepository: Repository<Servicos>,
  ) {}

  async create(createServicoDto: CreateServicoDto) {
    const serviceExist = await this.servicosRepository.findOneBy({
      nome: createServicoDto.nome,
      descricao: createServicoDto.descricao,
    });
    console.log(serviceExist);
    if (serviceExist) return 'Ja foi criado previamente';

    const saved = await this.servicosRepository.save(createServicoDto);
    return saved;
  }

  findAll() {
    return this.servicosRepository.find();
  }

  findOne(id: number) {
    return this.servicosRepository.findOneBy({ id });
  }

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    const servicoExistente = await this.servicosRepository.findOne({
      where: { id },
    });

    return this.servicosRepository.save({
      ...servicoExistente,
      ...updateServicoDto,
    });
  }

  async remove(id: number) {
    await this.servicosRepository.delete(id);
  }
}
