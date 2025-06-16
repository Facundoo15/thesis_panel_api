import { Module } from '@nestjs/common';
import { academicYearModuleProviders } from './contracts/provider';
import { AcademicYearController } from './controller/academic-year.controller';

@Module({
  imports: [],
  providers: [...academicYearModuleProviders],
  controllers: [AcademicYearController],
  exports: [...academicYearModuleProviders],
})
export class AcademicYearModule {}
