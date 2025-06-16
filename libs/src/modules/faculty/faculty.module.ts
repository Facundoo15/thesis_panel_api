import { Module } from '@nestjs/common';
import { facultyModuleProviders } from './contracts/provider';
import { FacultyController } from './controllers/faculty.controller';

@Module({
  imports: [],
  providers: [...facultyModuleProviders],
  controllers: [FacultyController],
  exports: [...facultyModuleProviders],
})
export class FacultyModule {}
