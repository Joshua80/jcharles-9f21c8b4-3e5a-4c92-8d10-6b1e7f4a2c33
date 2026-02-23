import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { User } from '../modules/users/user.entity';
import { Organization } from '../modules/organizations/organization.entity';
import { SeederService } from '../seeds/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), 'apps/api/.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(process.cwd(), 'apps/api/database/database.sqlite'),
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Organization]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}