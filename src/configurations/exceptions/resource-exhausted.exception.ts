import { RpcException } from '@nestjs/microservices';

export class ResourceExhaustedException extends RpcException {
  constructor(message = 'resource exhausted exception', code = 8) {
    super({ message, code });
  }
}
