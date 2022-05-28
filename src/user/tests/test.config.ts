import { ConfigModule } from '@nestjs/config';
import { ConfigRegisterAs } from '../../configurations/providers/config/config-register';
import Ports from 'find-free-ports';
import { FindFreePortsOptions } from 'find-free-ports';

export interface TestPorts {
  GRPC_PORT: number;
  FIRESTORE_PORT: number;
}
export const GeneratePorts = async (
  options?: FindFreePortsOptions,
): Promise<TestPorts> => {
  const [grpcPort, firestorePort] = await Ports(2, options);

  return {
    GRPC_PORT: grpcPort,
    FIRESTORE_PORT: firestorePort,
  };
};

export const TestConfig = (ports: TestPorts) =>
  ConfigModule.forFeature(
    ConfigRegisterAs({
      token: 'TEST',
      configFactory: () => {
        return ports;
      },
    }),
  );
