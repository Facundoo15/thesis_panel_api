import { AppConfigModule } from '@lib/src/config/app-config.module';
import { USER_REPOSITORY_KEY } from '@lib/src/modules/user/contracts/user.repository';
import { TypeOrmUserRepository } from '@lib/src/modules/user/repository/typeorm-user.repository';
import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { CasbinSeeder } from './casbin.seeder';

const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_KEY,
  useClass: TypeOrmUserRepository,
};

@Module({
  imports: [AppConfigModule, DatabaseModule],
  providers: [CasbinSeeder, userRepositoryProvider],
})
export class SeederModule {}
