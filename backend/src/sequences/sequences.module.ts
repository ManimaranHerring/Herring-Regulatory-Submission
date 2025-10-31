import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequencesController } from './sequences.controller';
import { SequencesService } from './sequences.service';
import { Sequence } from './sequence.entity';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sequence]), ApplicationsModule],
  controllers: [SequencesController],
  providers: [SequencesService],
})
export class SequencesModule {}
