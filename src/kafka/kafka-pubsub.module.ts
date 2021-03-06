import { KafkaAdminService } from './kafka-admin.service';
import { Kafka, KafkaConfig } from 'kafkajs';

import { DynamicModule, Global, Module } from '@nestjs/common';

import { KafkaParserConfig } from '../contracts';
import { KAFKA_CLIENT, KafkaParser, KafkaPubSubService } from './';
import { KAFKA_PAYLOAD_PARSER } from './kafka-pubsub.constants';

@Global()
@Module({})
export class KafkaPubSubModule {
  static register(
    config: KafkaConfig,
    parserConfig?: KafkaParserConfig,
  ): DynamicModule {
    return {
      module: KafkaPubSubModule,
      providers: [
        {
          provide: KAFKA_CLIENT,
          useFactory: () => {
            return new Kafka(config);
          },
        },
        {
          provide: KAFKA_PAYLOAD_PARSER,
          useFactory: () => {
            const prs = new KafkaParser();
            return prs.config(parserConfig);
          },
        },
        KafkaParser,
        KafkaPubSubService,
        KafkaAdminService,
      ],
      exports: [KafkaParser, KafkaPubSubService],
    };
  }
}
