import { Module } from '@nestjs/common';
import { BinanceApiService } from '@/apps/scrapper/src/binance-api/binance-api.service';
import { KafkaService } from '@/libs/kafka/src/kafka.service';

@Module({
    providers: [BinanceApiService, KafkaService]
})
export class BinanceApiModule {}
