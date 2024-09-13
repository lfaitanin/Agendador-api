import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './unidade.entity';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidade)
    private unidadeRepository: Repository<Unidade>,
  ) {}

  findAll() {
    return this.unidadeRepository.find();
  }
  async getNomesFantasia(): Promise<{ id: number; nomeFantasia: string }[]> {
    const unidades = await this.unidadeRepository.find();
    return unidades.map((unidade) => ({
      id: unidade.id,
      nomeFantasia: unidade.nomeFantasia,
    }));
  }
  async carregarDadosCSV(): Promise<void> {
    const csvFilePath = 'C:/Users/luiz/Downloads/cnes-hospitais.csv';

    fs.createReadStream(csvFilePath)
      .pipe(csvParser({ separator: ',' }))
      .on('data', async (row) => {
        const unidade = new Unidade();
        // Validação básica
        if (!unidade.nomeFantasia || !unidade.razaoSocial || !unidade.cnpj) {
          console.log('Dados inválidos encontrados: ', row);
          return;
        }
        unidade.nomeFantasia = row['Nome Fantasia']?.toUpperCase();
        unidade.razaoSocial = row['RazÃ£o Social']?.toUpperCase();
        unidade.cnpj = row['CNPJ']?.toUpperCase();
        console.log(row);
        // Tratar valores booleanos
        unidade.atendeSus = row['Atende SUS?']?.toUpperCase() === 'SIM';
        unidade.atendeConvenio =
          row['Atende Convenio?']?.toUpperCase() === 'SIM';

        try {
          await this.unidadeRepository.save(unidade);
        } catch (error) {
          console.error('Erro ao salvar unidade: ', error);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  }
}
