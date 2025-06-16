import { Module } from '@nestjs/common';
import { ProfessorController } from './controllers/professor.controller';
import { UserModule } from '../user/user.module';
import { professorModuleProviders } from './contracts/provider';

@Module({
  controllers: [ProfessorController],
  imports: [UserModule],
  providers: [...professorModuleProviders],
  exports: [...professorModuleProviders],
})
export class ProfessorModule {}
