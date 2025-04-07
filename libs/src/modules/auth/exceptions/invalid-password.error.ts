import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class InvalidPasswordException extends BaseException {
  constructor() {
    super('Password is not correct', 401, 'INVALID_CREDENTIALS');
  }
}
