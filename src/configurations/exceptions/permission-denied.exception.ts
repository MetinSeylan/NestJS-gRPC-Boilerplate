import { RpcException } from '@nestjs/microservices';

export class PermissionDeniedException extends RpcException {
  constructor(message = 'permission denied exception', code = 7) {
    super({ message, code });
  }
}
