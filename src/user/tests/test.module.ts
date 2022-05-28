import { DynamicModule, Module } from '@nestjs/common';
import { ConfigProvider } from '../../configurations/providers/config/config.provider';
import { FirestoreProvider } from '../../configurations/providers/firestore/firestore.provider';
import { UserModule } from '../user.module';
import { TestConfig, TestPorts } from './test.config';
import { TestClient } from './test.client';

@Module({})
export class TestModule {
  static forRoot(ports: TestPorts): DynamicModule {
    return {
      module: TestModule,
      imports: [
        ConfigProvider,
        FirestoreProvider,
        TestConfig(ports),
        TestClient,
        UserModule,
      ],
      controllers: [],
      providers: [],
    };
  }
}
