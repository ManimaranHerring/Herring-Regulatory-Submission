import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'sequences' })
export class Sequence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  application_id: string;

  @Column()
  sequence_number: string;

  @Column({ default: 'draft' })
  status: string;

  @Column({ default: 'not_run' })
  validation_status: string;

  @CreateDateColumn()
  created_at: Date;
}
