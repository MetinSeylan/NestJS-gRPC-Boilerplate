import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const OpenTelemetryProvider = OpenTelemetryModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    applicationName: configService.get('app.name'),
  }),
  inject: [ConfigService],
});
