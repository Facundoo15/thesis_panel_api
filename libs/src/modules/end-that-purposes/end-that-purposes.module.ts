import { Module } from '@nestjs/common';
import { endThatPurposesModuleProviders } from './contracts/provider';
import { EndThatPurposesController } from './controllers/end-that-purposes.controller';

@Module({
  imports: [],
  providers: [...endThatPurposesModuleProviders],
  controllers: [EndThatPurposesController],
  exports: [...endThatPurposesModuleProviders],
})
export class EndThatPurposesModule {}
