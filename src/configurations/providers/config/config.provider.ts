import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '../../app.config';

export const ConfigProvider = ConfigModule.forRoot({
  isGlobal: true,
  load: [AppConfig],
});
