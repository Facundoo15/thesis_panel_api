import { User, UserStatus } from '@lib/src/modules/user/models/user';
import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './base.schema';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  columns: {
    ...BaseColumnSchemaPart,
    firstName: {
      type: String,
      name: 'first_name',
      nullable: false,
    },
    lastName: {
      type: String,
      name: 'last_name',
      nullable: false,
    },
    email: {
      type: String,
      name: 'email',
      unique: true,
      nullable: false,
    },
    password: {
      type: String,
      name: 'password',
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: UserStatus,
      name: 'status',
      default: UserStatus.ACTIVE,
    },
    // Campo a relacionar...
    roleId: {
      type: Number,
      name: 'role_id',
    },
    verifiedAt: {
      type: 'timestamp',
      name: 'verified_at',
      nullable: true,
    },
    resetToken: {
      type: String,
      name: 'reset_token',
      nullable: true,
    },
    resetTokenExpiration: {
      type: String,
      name: 'reset_token_expiration',
      nullable: true,
    },
  },
  relations: {
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: {
        name: 'role_id',
        referencedColumnName: 'id',
      },
      eager: true
    },
  },
});
