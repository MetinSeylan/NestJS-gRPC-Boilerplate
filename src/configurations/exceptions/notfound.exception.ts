import { RpcException } from '@nestjs/microservices';

export class NotfoundException extends RpcException {
  constructor(message = 'notfound exception', code = 5) {
    super({ message, code });
  }
}
