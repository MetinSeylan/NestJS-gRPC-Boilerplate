import { NestFactory } from '@nestjs/core';
import { AppModule } from './configurations/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${process.env.PORT || '50001'}`,
      package: ['grpc.health.v1', 'com.user.v1'],
      protoPath: [
        join(
          __dirname,
          './health-check/proto/grpc/health/v1/health_service.proto',
        ),
        join(__dirname, './user/proto/com/user/v1/user_service.proto'),
      ],
    },
  });
  app.enableShutdownHooks();
  await app.listen();
}
bootstrap();
