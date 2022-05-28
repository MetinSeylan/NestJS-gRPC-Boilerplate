import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TestModule } from './test.module';
import { TestPorts } from './test.config';

export const TestApplication = async (ports: TestPorts) => {
  const app = await NestFactory.createMicroservice<GrpcOptions>(
    TestModule.forRoot(ports),
    {
      logger: ['error'],
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:${ports.GRPC_PORT}`,
        package: ['com.user.v1'],
        protoPath: [join(__dirname, '../proto/com/user/v1/user_service.proto')],
      },
    },
  );

  await app.listen();
  return app;
};
