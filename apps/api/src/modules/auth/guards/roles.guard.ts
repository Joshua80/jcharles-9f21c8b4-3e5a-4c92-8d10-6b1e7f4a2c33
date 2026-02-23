import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RoleType, hasRolePermission } from '@shared/data';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    if (!requiredRoles) return true;
    if (!request.user) {
      this.logger.warn(`Unauthorized access attempt to ${request.method} ${request.url}`);
      return false;
    }

    const hasPermission = hasRolePermission(request.user.role as RoleType, requiredRoles);
    if (!hasPermission) {
      this.logger.warn(
        `Access denied: User ${request.user.role} attempted to access ${request.method} ${request.url} requiring roles: ${requiredRoles.join(', ')}`,
      );
    }

    return hasPermission;
  }
}