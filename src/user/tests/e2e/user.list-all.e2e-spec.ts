import { StartedTestContainer } from 'testcontainers/dist/test-container';
import { TestContainerFirestore } from '../containers/firestore.container';
import { TestApplication } from '../test.application';
import { INestMicroservice } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GeneratePorts } from '../test.config';
import { UserRepository } from '../../repositories/user.repository';
import { com } from '../../proto/com/user/v1/user_service';
import UserService = com.user.v1.UserService;
import { toArray } from 'rxjs';

/**
 * For cold-startup
 */
jest.setTimeout(60000);

describe('User ListAll IT', () => {
  let firestoreContainer: StartedTestContainer;
  let app: INestMicroservice;
  let repository: UserRepository;
  let client;

  beforeAll(async () => {
    const ports = await GeneratePorts({ startPort: 3002 });
    firestoreContainer = await TestContainerFirestore(ports.FIRESTORE_PORT);
    app = await TestApplication(ports);
    repository = await app.get(UserRepository);

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

  it('should list all user', async () => {
    // given
    const users = [{ name: 'metin' }, { name: 'kemal' }];
    await repository.save(users[0]);
    await repository.save(users[1]);

    // when
    const response = await client.listAll().pipe(toArray()).toPromise();

    // then
    expect(response).toHaveLength(2);
  });
});
