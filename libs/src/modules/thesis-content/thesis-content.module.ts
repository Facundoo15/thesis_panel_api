import { Module } from '@nestjs/common';
import { ThesisModule } from '../thesis/thesis.module';
import { thesisContentModuleProviders } from './contracts/provider';
import { ThesisContentController } from './controller/thesis-content.controller';

@Module({
  imports: [ThesisModule],
  providers: [...thesisContentModuleProviders],
  controllers: [ThesisContentController],
  exports: [...thesisContentModuleProviders],
})
export class ThesisContentModule {}
