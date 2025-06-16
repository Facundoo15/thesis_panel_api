import { AppConfigService } from '@lib/src/config/app-config.service';
import { DataSource } from 'typeorm';
import { RoleSchema } from './typeorm/models';
import { UserSchema } from './typeorm/models/user.model';
import { StudentSchema } from './typeorm/models/student.model';
import { ProfessorSchema } from './typeorm/models/professor.model';
import { FacultySchema } from './typeorm/models/faculty.model';
import { SchoolSchema } from './typeorm/models/school.model';
import { AcademicYearSchema } from './typeorm/models/academic-year.model';
import { PeriodSchema } from './typeorm/models/period.model';
import { CourseSchema } from './typeorm/models/course.model';
import { SchoolProfessorSchema } from './typeorm/models/school-professor.model';
import { BudgetSchema } from './typeorm/models/budget.model';
import { ResearchLineSchema } from './typeorm/models/research-line.model';
import { ProfessorLineSchema } from './typeorm/models/professor-line.model';
import { EndThatPurposesSchema } from './typeorm/models/end-that-purposes.model';
import { ResearchDesignSchema } from './typeorm/models/research-design.model';
import { ThesisSchema } from './typeorm/models/thesis.model';
import { ThesisBudgetSchema } from './typeorm/models/thesis-budget.model';
import { ThesisStudent } from '../modules/thesis-student/models/thesis-student';
import { ThesisStudentSchema } from './typeorm/models/thesis-student.model';
import { ThesisContentSchema } from './typeorm/models/thesis-content.model';
import { ThesisReviewSchema } from './typeorm/models/thesis-review.model';
import { ThesisReviewDetailSchema } from './typeorm/models/thesis-review-detail.model';

export const DATA_SOURCE = Symbol('DATA_SOURCE');

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: AppConfigService) => {
      const dataSource = new DataSource({
        type: configService.DB_TYPE as any,
        host: configService.DB_HOST,
        port: configService.DB_PORT,
        username: configService.DB_USER,
        password: configService.DB_PASSWORD,
        database: configService.DB_NAME,
        entities: [
          RoleSchema,
          UserSchema,
          StudentSchema,
          ProfessorSchema,
          FacultySchema,
          SchoolSchema,
          AcademicYearSchema,
          PeriodSchema,
          CourseSchema,
          SchoolProfessorSchema,
          BudgetSchema,
          ResearchLineSchema,
          ProfessorLineSchema,
          EndThatPurposesSchema,
          ResearchDesignSchema,
          ThesisSchema,
          ThesisBudgetSchema,
          ThesisStudentSchema,
          ThesisContentSchema,
          ThesisReviewSchema,
          ThesisReviewDetailSchema,
        ],
        logging: configService.DB_LOGGING,
        synchronize: true,
      });
      return await dataSource.initialize();
    },
    inject: [AppConfigService],
  },
];
