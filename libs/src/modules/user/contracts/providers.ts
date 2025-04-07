import { Provider } from '@nestjs/common';
import { USER_REPOSITORY_KEY } from './user.repository';
import { TypeOrmUserRepository } from '../repository/typeorm-user.repository';
import { USER_SERVICE_KEY } from './user.service';
import { UserService } from '../service/user.service';

const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_KEY,
  useClass: TypeOrmUserRepository,
};

const userServiceProvider: Provider = {
  provide: USER_SERVICE_KEY,
  useClass: UserService,
};

export const userModuleProviders: Provider[] = [
  userRepositoryProvider,
  userServiceProvider,
  UserService,
];
