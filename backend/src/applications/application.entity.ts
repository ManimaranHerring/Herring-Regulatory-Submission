import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  org_id: string;

  @Column({ nullable: true })
  product_id: string;

  @Column()
  region: string; // GCC, UAE, EU, US, KSA

  @Column()
  format: string; // ectd, nees

  @Column({ nullable: true })
  application_number: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;

  @CreateDateColumn()
  created_at: Date;
}
