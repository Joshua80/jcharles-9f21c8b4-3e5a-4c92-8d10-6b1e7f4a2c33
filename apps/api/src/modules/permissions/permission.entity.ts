import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleType } from '@shared/data';

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
