import { FirestoreModule } from './firestore.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Profile } from '../../models/profile.enum';
import { FirestoreConfig } from './firestore.config';
import { Logger } from '@nestjs/common';

export const FirestoreProvider = FirestoreModule.forRoot({
  imports: [ConfigModule, FirestoreConfig],
  useFactory: async (configService: ConfigService) => {
    if (configService.get('app.profile') === Profile.TEST) {
      let host =
        configService.get('TEST.FIRESTORE_HOST') || process.env.FIRESTORE_HOST;
      if (!host) host = '0.0.0.0:8080';

      new Logger().log(
        `Firestore Test Profile: Firestore Host ${host}`,
        'FirestoreProvider',
      );

      return {
        projectId: configService.get('firestore.projectId'),
        emulator: {
          host,
        },
      };
    }
  },
  inject: [ConfigService],
});
