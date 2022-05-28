import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const TestClient = ClientsModule.registerAsync([
  {
    name: 'USER_TEST_CLIENT',
    useFactory: async (configService: ConfigService) => {
      return {
        transport: Transport.GRPC,
        options: {
          url: `0.0.0.0:${configService.get('TEST.GRPC_PORT')}`,
          package: 'com.user.v1',
          protoPath: join(__dirname, '../proto/com/user/v1/user_service.proto'),
        },
      };
    },
    inject: [ConfigService],
  },
]);
