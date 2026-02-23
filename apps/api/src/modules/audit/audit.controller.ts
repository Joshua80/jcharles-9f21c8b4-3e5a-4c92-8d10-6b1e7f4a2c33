import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles, GetUser } from '@shared/auth';
import { RoleType, UserPayload } from '@shared/data';
import { ListAuditDto } from './dto/audit-log.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('audit-log')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @ApiOperation({ summary: 'Get audit logs with pagination and filters (Owner and Admin only)' })
  @Get()
  @Roles(RoleType.OWNER, RoleType.ADMIN)
  async findAll(@GetUser() user: UserPayload, @Query() query: ListAuditDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const qb = this.auditService['dataSource']
      .getRepository('Audit')
      .createQueryBuilder('audit');

    if (query.action) qb.andWhere('audit.action = :action', { action: query.action });
    if (query.entityType) qb.andWhere('audit.entityType = :entityType', { entityType: query.entityType });

    qb.orderBy('audit.createdAt', 'DESC');
    qb.skip(skip).take(limit);

    const [logs, total] = await qb.getManyAndCount();

    return {
      data: logs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}