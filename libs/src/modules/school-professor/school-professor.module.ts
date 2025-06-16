import { Module } from '@nestjs/common';
import { schoolProfessorModuleProviders } from './contracts/providers';
import { SchoolProfessorController } from './controller/school-professor.controller';
import { SchoolModule } from '../school/school.module';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [SchoolModule, ProfessorModule],
  providers: [...schoolProfessorModuleProviders],
  controllers: [SchoolProfessorController],
  exports: [...schoolProfessorModuleProviders],
})
export class SchoolProfessorModule {}
