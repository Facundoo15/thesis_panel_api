import { AppConfigService } from '@lib/src/config/app-config.service';
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import {
  IUserService,
  USER_SERVICE_KEY,
} from '../../user/contracts/user.service';
import { IS_PUBLIC_KEY } from '@lib/src/common/contracts';
import { MissingTokenException } from '../exceptions/missing-token.error';
import { InvalidTokenException } from '../exceptions/invalid-token.error';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(USER_SERVICE_KEY) private readonly _userService: IUserService,
    private readonly _jwtService: JwtService,
    private readonly _reflector: Reflector,
    private readonly _config: AppConfigService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new MissingTokenException();

    try {
      const payload = await this._jwtService.verifyAsync(token, {
        secret: this._config.JWT_SECRET,
      });
      request['user'] = payload;
      const email = payload.email;
      const user = await this._userService.findByEmail(email);
      return user.id == payload.subject;
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
