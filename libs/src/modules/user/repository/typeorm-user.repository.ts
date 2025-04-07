import { BaseRepository } from '@lib/src/common/models/base.repository';
import { User } from '../models/user';
import { IUserRepository } from '../contracts/user.repository';
import { Inject } from '@nestjs/common';
import { DATA_SOURCE } from '@lib/src/database/database.provider';
import { DataSource } from 'typeorm';
import { UserSchema } from '@lib/src/database/typeorm/models/user.model';
import { ResponseUserDTO } from '../dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

export class TypeOrmUserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(@Inject(DATA_SOURCE) dataSource: DataSource) {
    super(dataSource, UserSchema);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this._repository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) return null;
    return user;
  }
  async findByRoleId(roleId: number): Promise<ResponseUserDTO[] | null> {
    const users = await this._repository.find({
      where: { roleId },
      relations: ['role'],
    });

    if (users.length === 0) return null;

    return users.map((user) => plainToInstance(ResponseUserDTO, user));
  }
}
