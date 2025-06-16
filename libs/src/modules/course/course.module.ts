import { Module } from '@nestjs/common';
import { courseModuleProviders } from './contracts/provider';
import { SchoolModule } from '../school/school.module';
import { AcademicYearModule } from '../academic-year/academic-year.module';
import { PeriodModule } from '../period/period.module';
import { CourseController } from './controllers/course.controller';

@Module({
  imports: [AcademicYearModule, PeriodModule, SchoolModule],
  providers: [...courseModuleProviders],
  controllers: [CourseController],
  exports: [...courseModuleProviders],
})
export class CourseModule {}
