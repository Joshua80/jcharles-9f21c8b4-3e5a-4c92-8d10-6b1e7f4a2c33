import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeederModule } from '../seeder/seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const logger = new Logger('SeederBootstrap');

  try {
    // Use SeederModule here instead of AppModule to avoid loading the whole API
    const app = await NestFactory.createApplicationContext(SeederModule);
    const seeder = app.get(SeederService);

    logger.log('Starting seeding process...');
    await seeder.seed();
    logger.log('Seeding finished successfully.');

    await app.close();
    process.exit(0);
  } catch (err) {
    logger.error('Seeder failed', err instanceof Error ? err.stack : err);
    process.exit(1);
  }
}

bootstrap();
