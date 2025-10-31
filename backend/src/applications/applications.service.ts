import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private repo: Repository<Application>,
  ) {}

  findAll(region?: string) {
    if (region) {
      return this.repo.find({ where: { region } });
    }
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  create(dto: any) {
    const app = this.repo.create({
      product_id: dto.product_id || null,
      region: dto.region,
      format: dto.format,
      application_number: dto.application_number || null,
      metadata: dto.metadata || null,
    });
    return this.repo.save(app);
  }
}
