import { Module } from '@nestjs/common';
import { ThesisModule } from '../thesis/thesis.module';
import { StudentModule } from '../student/student.module';
import { ThesisStudentController } from './controller/thesis-student.controller';
import { ProfessorModule } from '../professor/professor.module';
import { thesisStudentModuleProviders } from './contracts/provider';

@Module({
  imports: [ProfessorModule, ThesisModule, StudentModule],
  providers: [...thesisStudentModuleProviders],
  controllers: [ThesisStudentController],
  exports: [...thesisStudentModuleProviders],
})
export class ThesisStudentModule {}
