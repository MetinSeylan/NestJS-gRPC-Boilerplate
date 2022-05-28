import { RpcException } from '@nestjs/microservices';

export class InvalidArgumentException extends RpcException {
  constructor(message = 'invalid argument', code = 3) {
    super({ message, code });
  }
}
