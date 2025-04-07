import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class MissingTokenException extends BaseException {
  constructor() {
    super('Token is missing', 401, 'MISSING_TOKEN');
  }
}
