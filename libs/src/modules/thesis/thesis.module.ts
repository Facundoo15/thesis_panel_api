import { Module } from '@nestjs/common';
import { ProfessorModule } from '../professor/professor.module';
import { ResearchDesignModule } from '../research-design/research-design.module';
import { EndThatPurposesModule } from '../end-that-purposes/end-that-purposes.module';
import { thesisModuleProviders } from './contracts/provider';
import { ThesisController } from './controller/thesis.controller';

@Module({
  imports: [ProfessorModule, ResearchDesignModule, EndThatPurposesModule],
  providers: [...thesisModuleProviders],
  controllers: [ThesisController],
  exports: [...thesisModuleProviders],
})
export class ThesisModule {}
