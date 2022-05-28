import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';

export const FirestoreOptionsProvider = 'firestoreOptions';

export interface FirestoreModuleConfig extends Settings {
  emulator?: {
    host: string;
  };
}

type FirestoreModuleOptions = {
  imports: any[];
  useFactory: (...args: any[]) => FirestoreModuleConfig;
  inject: any[];
};

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider = {
      provide: FirestoreOptionsProvider,
      useFactory: options.useFactory,
      inject: options.inject,
    };
    const dbProvider = {
      provide: Firestore,
      useFactory: (config: FirestoreModuleConfig) => {
        if (config?.emulator.host) {
          process.env.FIRESTORE_EMULATOR_HOST = config?.emulator.host;
        }
        return new Firestore(config);
      },
      inject: [FirestoreOptionsProvider],
    };
    return {
      global: true,
      module: FirestoreModule,
      imports: options.imports,
      providers: [optionsProvider, dbProvider],
      exports: [dbProvider],
    };
  }
}
