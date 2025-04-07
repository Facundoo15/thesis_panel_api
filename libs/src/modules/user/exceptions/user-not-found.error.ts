import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class UserNotFoundException extends BaseException {
  constructor(userId: number) {
    super(`User with ID ${userId} not found`, 404, 'USER_NOT_FOUND', {
      userId,
    });
  }
}
