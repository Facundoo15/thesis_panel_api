import { BaseException } from "@lib/src/common/errors/base-exception.error";

export class InvalidTokenException extends BaseException {
  constructor() {
    super('Token is invalid', 401, 'INVALID_TOKEN');
  }
}
