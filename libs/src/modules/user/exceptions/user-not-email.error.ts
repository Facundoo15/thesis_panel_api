import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class UserNotEmail extends BaseException {
  constructor(email: string) {
    super(`The email '${email}' not exist`, 409, 'EMAIL_NOT_EXIST', {
      email,
    });
  }
}
