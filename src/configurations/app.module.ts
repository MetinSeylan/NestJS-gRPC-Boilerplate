import { Module } from '@nestjs/common';
import { ConfigProvider } from './providers/config/config.provider';
import { OpenTelemetryProvider } from './providers/open-telemetry/opentelemetry.provider';
import { HealthCheckModule } from '../health-check/health-check.module';
import { UserModule } from '../user/user.module';
import { FirestoreProvider } from './providers/firestore/firestore.provider';

@Module({
  imports: [
    ConfigProvider,
    OpenTelemetryProvider,
    FirestoreProvider,
    HealthCheckModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
