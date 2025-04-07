import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from './database/typeorm/seeders/seeder.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    RoleModule,
    UserModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
