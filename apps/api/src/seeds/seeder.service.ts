import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organization } from '../modules/organizations/organization.entity';
import { User } from '../modules/users/user.entity';
import { RoleType } from '@shared/data';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(private dataSource: DataSource) {}

  async seed(): Promise<void> {
    const orgRepo = this.dataSource.getRepository(Organization);
    const userRepo = this.dataSource.getRepository(User);

    // Check if already seeded
    const existingOrg = await orgRepo.count();
    if (existingOrg > 0) {
      this.logger.log('Database already seeded ✅');
      return;
    }

    this.logger.log('Seeding database...');

    try {
      // Create Organization
      const organization = orgRepo.create({ name: 'Demo Organization' });
      await orgRepo.save(organization);

      // Hash password
      const passwordHash = await bcrypt.hash('123456', 10);

      // Create Users
      const users = [
        { email: 'owner@example.com', username: 'owner', role: RoleType.OWNER },
        { email: 'admin@example.com', username: 'admin', role: RoleType.ADMIN },
        { email: 'viewer@example.com', username: 'viewer', role: RoleType.VIEWER },
        { email: 'viewer1@example.com', username: 'viewer1', role: RoleType.VIEWER },
      ].map((u) => userRepo.create({ ...u, passwordHash, organization }));

      await userRepo.save(users);

      this.logger.log('Seeding completed successfully!');
      this.logger.log('Default credentials:');
      this.logger.log('  - Owner: owner@example.com / 123456');
      this.logger.log('  - Admin: admin@example.com / 123456');
      this.logger.log('  - Viewer: viewer@example.com / 123456');
      this.logger.log('  - Viewer1: viewer1@example.com / 123456');
    } catch (error) {
      this.logger.error('Seeder failed', error);
      throw error;
    }
  }
}