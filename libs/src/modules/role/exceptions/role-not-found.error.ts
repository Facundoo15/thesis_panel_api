import { BaseException } from '@lib/src/common/errors/base-exception.error';

export class RoleNotFoundException extends BaseException {
  constructor(roleId: number) {
    super(`Role with ID ${roleId} not found`, 404, 'ROLE_NOT_FOUND', {
      roleId,
    });
  }
}
