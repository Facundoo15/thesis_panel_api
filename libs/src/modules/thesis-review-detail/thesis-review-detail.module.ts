import { Module } from '@nestjs/common';
import { ThesisReviewModule } from '../thesis-review/thesis-review.module';
import { ThesisContentModule } from '../thesis-content/thesis-content.module';

@Module({
  imports: [ThesisReviewModule, ThesisContentModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ThesisReviewDetailModule {}
