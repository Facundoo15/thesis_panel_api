import { Module } from '@nestjs/common';
import { FacultyModule } from '../faculty/faculty.module';
import { schoolModuleProviders } from './contracts/providers';
import { SchoolController } from './controller/school.controller';

@Module({
  imports: [FacultyModule],
  providers: [...schoolModuleProviders],
  controllers: [SchoolController],
  exports: [...schoolModuleProviders],
})
export class SchoolModule {}
