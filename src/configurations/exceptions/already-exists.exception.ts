import { RpcException } from '@nestjs/microservices';

export class AlreadyExistsException extends RpcException {
  constructor(message = 'already exists', code = 6) {
    super({ message, code });
  }
}
