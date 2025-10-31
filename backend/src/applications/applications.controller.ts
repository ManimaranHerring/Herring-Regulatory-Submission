import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly apps: ApplicationsService) {}

  @Get()
  findAll(@Query('region') region?: string) {
    return this.apps.findAll(region);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apps.findOne(id);
  }

  @Post()
  create(@Body() dto: any) {
    return this.apps.create(dto);
  }
}
