import { RpcException } from '@nestjs/microservices';

export class FailedPreconditionException extends RpcException {
  constructor(message = 'failed precondition exception', code = 9) {
    super({ message, code });
  }
}
