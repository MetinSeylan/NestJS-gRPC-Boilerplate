import * as Joi from 'joi';
import { ConfigRegisterAs } from './providers/config/config-register';
import { Profile } from './models/profile.enum';

export const AppConfig = ConfigRegisterAs({
  token: 'app',
  configFactory: () => ({
    name: process.env.APP_NAME,
    profile: process.env.PROFILE,
    port: process.env.PORT,
  }),
  validationSchema: Joi.object().keys({
    name: Joi.string().default('Nestjs GRPC Boilerplate'),
    profile: Joi.string()
      .allow(...Object.keys(Profile))
      .default('TEST'),
    port: Joi.number(),
  }),
  validationOptions: {
    convert: true,
  },
});
