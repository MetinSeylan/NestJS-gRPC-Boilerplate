import { RpcException } from '@nestjs/microservices';

export class InternalException extends RpcException {
  constructor(message = 'internal exception', code = 13) {
    super({ message, code });
  }
}
