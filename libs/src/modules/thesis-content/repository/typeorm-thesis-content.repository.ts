import { BaseRepository } from '@lib/src/common/models/base.repository';
import { ThesisContent } from '../models/thesis-content';
import { IThesisContentRepository } from '../contracts/thesis-content.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { ThesisContentSchema } from '@lib/src/database/typeorm/models/thesis-content.model';
import { ThesisSection } from '../models/thesis-section';
import { ContentReviewStatus } from '../models/thesis-review-status';

export class TypeOrmThesisContentRepository
  extends BaseRepository<ThesisContent>
  implements IThesisContentRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, ThesisContentSchema);
  }
  async findByThesisId(thesisId: number): Promise<ThesisContent[]> {
    return this._repository.find({ where: { thesisId } });
  }

  async findByThesisAndSection(
    thesisId: number,
    section: ThesisSection,
  ): Promise<ThesisContent | null> {
    return this._repository.findOne({
      where: { thesisId: thesisId, section: section },
    });
  }
  async findPendingByThesis(thesisId: number): Promise<ThesisContent[]> {
    return this._repository.find({
      where: {
        thesisId,
        reviewStatus: ContentReviewStatus.PENDING,
      },
    });
  }
  async updateReviewStatus(
    contentId: number,
    reviewStatus: ContentReviewStatus,
  ): Promise<void> {
    await this._repository.update(contentId, {
      reviewStatus: reviewStatus,
    });
  }
  async incrementVersion(contentId: number): Promise<void> {
    await this._repository.increment({ id: contentId }, 'version', 1);
  }
}
