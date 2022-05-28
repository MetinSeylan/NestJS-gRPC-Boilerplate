import { RpcException } from '@nestjs/microservices';

export class UnauthenticatedException extends RpcException {
  constructor(message = 'unauthenticated exception', code = 16) {
    super({ message, code });
  }
}
