import { Module } from '@nestjs/common';
import { researchDesignModuleProviders } from './contracts/provider';
import { ResearchDesignController } from './controller/research-design.controller';

@Module({
  imports: [],
  providers: [...researchDesignModuleProviders],
  controllers: [ResearchDesignController],
  exports: [...researchDesignModuleProviders],
})
export class ResearchDesignModule {}
