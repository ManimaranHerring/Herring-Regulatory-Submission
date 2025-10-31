import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SequencesService } from './sequences.service';

@Controller('sequences')
export class SequencesController {
  constructor(private readonly seqs: SequencesService) {}

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.seqs.getOneWithFakeTree(id);
  }

  @Post()
  create(@Body() dto: any) {
    // dto should contain application_id
    return this.seqs.create(dto.application_id);
  }
}
