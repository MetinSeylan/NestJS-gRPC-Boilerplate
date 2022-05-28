import { ConfigFactory, getConfigToken } from '@nestjs/config';
import {
  PARTIAL_CONFIGURATION_KEY,
  PARTIAL_CONFIGURATION_PROPNAME,
} from '@nestjs/config/dist/config.constants';
import { AnySchema, ValidationOptions } from 'joi';

export type ConfigFactoryKeyHost = { KEY: string };

export interface ConfigRegisterAsFactory {
  token: string;
  configFactory: ConfigFactory;
  validationSchema?: AnySchema;
  validationOptions?: ValidationOptions;
}

export const ConfigRegisterAs = function ConfigRegister(
  configRegisterAsFactory: ConfigRegisterAsFactory,
): ConfigFactory<ConfigFactoryKeyHost> {
  let factory = configRegisterAsFactory.configFactory;

  if (configRegisterAsFactory.validationSchema) {
    const { error, value } = configRegisterAsFactory.validationSchema.validate(
      configRegisterAsFactory.configFactory(),
      configRegisterAsFactory.validationOptions,
    );

    if (error) {
      console.error(JSON.stringify(error.details));
      process.exit(0);
    }

    factory = () => value;
  }

  Object.defineProperty(factory, PARTIAL_CONFIGURATION_KEY, {
    configurable: false,
    enumerable: false,
    value: configRegisterAsFactory.token,
    writable: false,
  });
  Object.defineProperty(factory, PARTIAL_CONFIGURATION_PROPNAME, {
    configurable: false,
    enumerable: false,
    value: getConfigToken(configRegisterAsFactory.token),
    writable: false,
  });

  return factory as ConfigFactory<ConfigFactoryKeyHost>;
};
