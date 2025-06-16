import { Module } from '@nestjs/common';
import { ThesisModule } from '../thesis/thesis.module';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule, ThesisModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ThesisReviewModule {}
