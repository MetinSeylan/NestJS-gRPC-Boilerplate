import * as Joi from 'joi';
import { ConfigRegisterAs } from '../config/config-register';
import { ConfigModule } from '@nestjs/config';

export const FirestoreConfig = ConfigModule.forFeature(
  ConfigRegisterAs({
    token: 'firestore',
    configFactory: () => ({
      projectId: process.env.FIRESTORE_PROJECTID,
    }),
    validationSchema: Joi.object().keys({
      projectId: Joi.string().default('test'),
    }),
    validationOptions: {
      convert: true,
    },
  }),
);
