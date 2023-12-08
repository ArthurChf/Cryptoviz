import { Module } from '@nestjs/common';
import { KakfaService } from './kakfa.service';
import {SchemaRegisteryService} from "@app/kakfa/schema-registery.service";

@Module({
  providers: [KakfaService, SchemaRegisteryService],
  exports: [KakfaService, SchemaRegisteryService],
})
export class KakfaModule {}
