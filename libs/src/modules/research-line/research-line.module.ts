import { Module } from '@nestjs/common';
import { researchLineModuleProviders } from './contracts/providers';
import { ResearchLineController } from './controller/research-line.controller';

@Module({
  imports: [],
  providers: [...researchLineModuleProviders],
  controllers: [ResearchLineController],
  exports: [...researchLineModuleProviders],
})
export class ResearchLineModule {}
