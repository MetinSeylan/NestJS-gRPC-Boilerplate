import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { grpc } from '../proto/grpc/health/v1/health_service';

@Controller()
export class HealthCheckController {
  /**
   * mock response for now
   */
  @GrpcMethod('HealthService', 'Check')
  public async check(): Promise<grpc.health.v1.HealthCheckResponse> {
    return {
      status: grpc.health.v1.HealthCheckResponse.ServingStatus.SERVING,
    };
  }
}
