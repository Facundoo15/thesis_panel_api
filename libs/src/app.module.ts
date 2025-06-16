import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SeederModule } from './database/typeorm/seeders/seeder.module';
import { StudentModule } from './modules/student/student.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { FacultyModule } from './modules/faculty/faculty.module';
import { SchoolModule } from './modules/school/school.module';
import { AcademicYearModule } from './modules/academic-year/academic-year.module';
import { PeriodModule } from './modules/period/period.module';
import { CourseModule } from './modules/course/course.module';
import { SchoolProfessorModule } from './modules/school-professor/school-professor.module';
import { BudgetModule } from './modules/budget/budget.module';
import { ResearchLineModule } from './modules/research-line/research-line.module';
import { ProfessorLineModule } from './modules/professor-line/professor-line.module';
import { EndThatPurposesModule } from './modules/end-that-purposes/end-that-purposes.module';
import { ResearchDesignModule } from './modules/research-design/research-design.module';
import { ThesisModule } from './modules/thesis/thesis.module';
import { ThesisBudget } from './modules/thesis-budget/models/thesis-budget';
import { ThesisBudgetModule } from './modules/thesis-budget/thesis-budget.module';
import { ThesisStudentModule } from './modules/thesis-student/thesis-student.module';
import { ThesisContentModule } from './modules/thesis-content/thesis-content.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    RoleModule,
    UserModule,
    AuthModule,
    SeederModule,
    StudentModule,
    ProfessorModule,
    FacultyModule,
    SchoolModule,
    AcademicYearModule,
    PeriodModule,
    CourseModule,
    SchoolProfessorModule,
    BudgetModule,
    ResearchLineModule,
    ProfessorLineModule,
    EndThatPurposesModule,
    ResearchDesignModule,
    ThesisModule,
    ThesisBudgetModule,
    ThesisStudentModule,
    ThesisContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
