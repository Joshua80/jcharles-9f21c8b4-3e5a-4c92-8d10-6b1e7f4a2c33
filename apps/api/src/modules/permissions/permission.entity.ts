import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleType } from '@hnamdev-7f3a1b92-6d4e-4c8a-9b5f-2e1a3c7d8e90/data';

export enum PermissionAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANAGE = 'MANAGE', // Full control
}

export enum PermissionResource {
  TASK = 'TASK',
  USER = 'USER',
  ORGANIZATION = 'ORGANIZATION',
  AUDIT_LOG = 'AUDIT_LOG',
}

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
  })
  role: RoleType;

  @Column({
    type: 'text',
  })
  resource: PermissionResource;

  @Column({
    type: 'text',
  })
  action: PermissionAction;

  @Column({ default: true })
  allowed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
