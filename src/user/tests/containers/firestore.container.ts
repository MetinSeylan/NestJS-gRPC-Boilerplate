import { GenericContainer, Wait } from 'testcontainers';
import { StartedTestContainer } from 'testcontainers/dist/test-container';

// docker run -p 8081:8080 gcr.io/google.com/cloudsdktool/cloud-sdk:emulators gcloud beta emulators firestore start --host-port=0.0.0.0:8080
export const TestContainerFirestore = async (
  port: number,
): Promise<StartedTestContainer> => {
  return new GenericContainer(
    'gcr.io/google.com/cloudsdktool/cloud-sdk:emulators',
  )
    .withExposedPorts({
      container: 8080,
      host: port,
    })
    .withCmd([
      'gcloud',
      'beta',
      'emulators',
      'firestore',
      'start',
      '--host-port=0.0.0.0:8080',
    ])
    .withName('firestore-emulator-' + port)
    .withWaitStrategy(
      Wait.forLogMessage('[firestore] Dev App Server is now running.'),
    )
    .start();
};
