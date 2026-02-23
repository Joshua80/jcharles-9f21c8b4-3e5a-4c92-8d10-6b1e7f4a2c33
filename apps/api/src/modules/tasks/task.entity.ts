import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';
import { TaskStatus } from '@shared/data';

// Re-export for backward compatibility
export { TaskStatus };

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  category: string;

  @Column({
    type: 'text',
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column({ default: 0 })
  position: number;

  // ------------------------
  // Created By
  // ------------------------
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: string;

  // ------------------------
  // Assigned To
  // ------------------------
  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'assignedToId' })
  assignedTo?: User;

  @Column({ nullable: true })
  assignedToId?: string;

  // ------------------------
  // Organization
  // ------------------------
  @ManyToOne(() => Organization, { eager: true })
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @Column()
  organizationId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}