import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@hnamdev-7f3a1b92-6d4e-4c8a-9b5f-2e1a3c7d8e90/data';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleType[]) =>
  SetMetadata(ROLES_KEY, roles);
