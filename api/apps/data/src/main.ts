import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { DataModule } from '@/apps/data/src/data.module';

async function bootstrap() {
    const app = await NestFactory.create(DataModule);
    app.useWebSocketAdapter(new WsAdapter(app));
    app.enableCors({
        origin: 'http://127.0.0.1:5173',
        credentials: true
    });
    await app.listen(3000);
}
bootstrap();
