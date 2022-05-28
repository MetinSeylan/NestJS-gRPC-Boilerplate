import { StartedTestContainer } from 'testcontainers/dist/test-container';
import { TestContainerFirestore } from '../containers/firestore.container';
import { TestApplication } from '../test.application';
import { INestMicroservice } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GeneratePorts } from '../test.config';
import { com } from '../../proto/com/user/v1/user_service';
import UserService = com.user.v1.UserService;
import { UserRepository } from '../../repositories/user.repository';

/**
 * For cold-startup
 */
jest.setTimeout(60000);

describe('User Create IT', () => {
  let firestoreContainer: StartedTestContainer;
  let app: INestMicroservice;
  let repository: UserRepository;
  let client;

  beforeAll(async () => {
    const ports = await GeneratePorts({ startPort: 3004 });
    firestoreContainer = await TestContainerFirestore(ports.FIRESTORE_PORT);
    app = await TestApplication(ports);
    repository = app.get(UserRepository);

    client = app
      .get<ClientGrpc>('USER_TEST_CLIENT')
      .getService<UserService>('UserService');
  });

  afterAll(async () => {
    await app.close();
    await firestoreContainer.stop();
  });

  afterEach(async () => {
    await repository.deleteAll();
  });

  it('should create user', async () => {
    // given
    const user = {
      name: 'metin',
    };

    const response = await client.create(user).toPromise();

    expect(response).toHaveProperty('name', user.name);
  });

  it('should throw exception when payload is not validated', async () => {
    // given
    const user = {
      name: 'metin',
    };

    try {
      //when
      await client.create(user).toPromise();
    } catch (error) {
      // then
      expect(error).toHaveProperty('code', 3);
      expect(error).toHaveProperty('details', 'invalid argument');
      expect(error).toHaveProperty(
        'message',
        '3 INVALID_ARGUMENT: invalid argument',
      );
    }
  });
});
