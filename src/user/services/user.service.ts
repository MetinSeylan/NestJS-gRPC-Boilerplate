import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserCollection } from '../../collections/user.collection';
import { UserNotfoundException } from '../exceptions/user-notfound.exception';
import { Observable } from 'rxjs';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findOne(id: string): Promise<UserCollection> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new UserNotfoundException();

    return user;
  }

  listAll(): Observable<UserCollection> {
    return this.userRepository.listAll();
  }

  async create(userCreateRequest: UserCollection): Promise<UserCollection> {
    const exists = await this.userRepository.findByName(userCreateRequest.name);

    if (exists) throw new UserAlreadyExistsException();

    return await this.userRepository.save(userCreateRequest);
  }
}
