import {
  IReadableRepository,
  IWriteableRepository,
} from '@lib/src/common/contracts';
import { Course } from '../models/course';

export const COURSE_REPOSITORY_KEY = Symbol('ICourseRepository');

export interface ICourseRepository
  extends IWriteableRepository<Course>,
    IReadableRepository<Course> {
  getCoursesByPeriod(period: string): Promise<Course[] | null>;
}
