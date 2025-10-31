import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sequence } from './sequence.entity';
import { ApplicationsService } from '../applications/applications.service';

@Injectable()
export class SequencesService {
  constructor(
    @InjectRepository(Sequence)
    private repo: Repository<Sequence>,
    private apps: ApplicationsService,
  ) {}

  async create(application_id: string) {
    const app = await this.apps.findOne(application_id);
    if (!app) throw new NotFoundException('Application not found');

    // get last sequence number
    const existing = await this.repo.find({ where: { application_id } });
    const nextNumber = existing.length.toString().padStart(4, '0');

    const seq = this.repo.create({
      application_id,
      sequence_number: nextNumber,
    });
    return this.repo.save(seq);
  }

  async getOneWithFakeTree(id: string) {
    const seq = await this.repo.findOne({ where: { id } });
    if (!seq) throw new NotFoundException('Sequence not found');

    // get application to know region/format
    // (simple version)
    const app = await this.apps.findOne(seq.application_id);

    // basic CTD tree, later load from file
    const tree = [
      {
        id: 'm1',
        code: '1',
        title: 'Module 1 – Regional',
        children: [
          { id: 'm1.1', code: '1.1', title: 'Cover Letter' },
          { id: 'm1.2', code: '1.2', title: 'Application Forms' }
        ]
      },
      { id: 'm2', code: '2', title: 'Module 2 – CTD Summaries', children: [] },
      { id: 'm3', code: '3', title: 'Module 3 – Quality', children: [] }
    ];

    return {
      id: seq.id,
      sequence_number: seq.sequence_number,
      status: seq.status,
      validation_status: seq.validation_status,
      application: app,
      tree,
      leaves: [],
      validations: [],
      comments: []
    };
  }
}
