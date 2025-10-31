import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DbModule } from './db.module';
import { ApplicationsModule } from './applications/applications.module';
import { SequencesModule } from './sequences/sequences.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/regdb',
        autoLoadEntities: true,
        synchronize: false
      })
    }),
    DbModule,
    ApplicationsModule,
    SequencesModule
  ],
  controllers: [AppController],
})
export class AppModule {}
