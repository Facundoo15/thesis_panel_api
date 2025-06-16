import { Module } from '@nestjs/common';
import { AcademicYearModule } from '../academic-year/academic-year.module';
import { periodModuleProviders } from './contracts/provider';
import { PeriodController } from './controller/period.controller';

@Module({
  imports: [AcademicYearModule],
  providers: [...periodModuleProviders],
  controllers: [PeriodController],
  exports: [...periodModuleProviders],
})
export class PeriodModule {}
