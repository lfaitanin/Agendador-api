import { PartialType } from '@nestjs/swagger';
import { CreateUnidadeDto } from './create-unidade.dto';

export class UpdateUnidadeDto extends PartialType(CreateUnidadeDto) {}
