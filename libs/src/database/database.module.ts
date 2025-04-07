import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { AppConfigModule } from '../config/app-config.module';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
