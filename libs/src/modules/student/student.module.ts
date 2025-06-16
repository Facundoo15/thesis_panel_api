import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { UserModule } from '../user/user.module';
import { studentModuleProviders } from './contracts/provider';

@Module({
  controllers: [StudentController],
  imports: [UserModule],
  providers: [...studentModuleProviders],
  exports: [...studentModuleProviders],
})
export class StudentModule {}
