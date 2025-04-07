import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class UserDuplicateEmail extends BaseException {
  constructor(email: string) {
    super(`The email '${email}' is already in use`, 409, 'DUPLICATE_EMAIL', {
      email,
    });
  }
}
