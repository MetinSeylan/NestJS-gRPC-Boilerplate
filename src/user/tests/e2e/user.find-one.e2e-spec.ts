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

describe('User FindOne IT', () => {
  let firestoreContainer: StartedTestContainer;
  let app: INestMicroservice;
  let repository: UserRepository;
  let client;

  beforeAll(async () => {
    const ports = await GeneratePorts({ startPort: 3000 });
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

  it('should return a user', async () => {
    // given
    const user = { name: 'metin' };
    const saved = await repository.save(user);

    // when
    const response = await client.findOne({ id: saved.id }).toPromise();

    // then
    expect(response).toHaveProperty('name', user.name);
  });

  it('should throw exception when user not found', async () => {
    // given
    const userId = 'nope';

    try {
      //when
      await client.findOne({ id: userId }).toPromise();
    } catch (error) {
      // then
      expect(error).toHaveProperty('code', 5);
      expect(error).toHaveProperty('details', 'notfound exception');
      expect(error).toHaveProperty(
        'message',
        '5 NOT_FOUND: notfound exception',
      );
    }
  });
});
