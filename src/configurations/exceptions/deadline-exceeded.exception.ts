import { RpcException } from '@nestjs/microservices';

export class DeadlineExceededException extends RpcException {
  constructor(message = 'deadline exceeded', code = 4) {
    super({ message, code });
  }
}
