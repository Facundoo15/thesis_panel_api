import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { userModuleProviders } from './contracts/providers';
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [RoleModule, forwardRef(() => AuthModule)],
  providers: [...userModuleProviders],
  exports: [...userModuleProviders],
})
export class UserModule {}
