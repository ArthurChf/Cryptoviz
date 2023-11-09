import { NestFactory } from '@nestjs/core';
import { ScrapperModule } from './scrapper.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(ScrapperModule);
    await app.listen(process.env.JOBS_SERVICE_PORT || 3001);
}
bootstrap();
