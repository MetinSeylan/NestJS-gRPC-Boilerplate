import { Controller, Inject } from '@nestjs/common';
import { com } from '../proto/com/user/v1/user_service';
import { UserService } from '../services/user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { UserCollection } from '../../collections/user.collection';
import { Observable } from 'rxjs';
import { Validate } from '../../configurations/providers/validator/validate';
import { UserCreateValidator } from './validators/user-create.validator';

@Controller()
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Validate(UserCreateValidator)
  @GrpcMethod('UserService', 'Create')
  public create(userCreateRequest: UserCollection): Promise<UserCollection> {
    return this.userService.create(userCreateRequest);
  }

  @GrpcMethod('UserService', 'FindOne')
  public async findOne(
    findOneRequest: com.user.v1.FindOneRequest,
  ): Promise<UserCollection> {
    return this.userService.findOne(findOneRequest.id);
  }

  @GrpcMethod('UserService', 'ListAll')
  public listAll(): Observable<UserCollection> {
    return this.userService.listAll();
  }
}
