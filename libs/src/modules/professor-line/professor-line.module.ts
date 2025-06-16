import { Module } from '@nestjs/common';
import { ProfessorModule } from '../professor/professor.module';
import { ResearchLineModule } from '../research-line/research-line.module';
import { ProfessorLineController } from './controller/professor-line.controller';
import { professorLineModuleProviders } from './contracts/providers';

@Module({
  imports: [ProfessorModule, ResearchLineModule],
  providers: [...professorLineModuleProviders],
  controllers: [ProfessorLineController],
  exports: [...professorLineModuleProviders],
})
export class ProfessorLineModule {}
