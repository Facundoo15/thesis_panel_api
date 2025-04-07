import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Controller,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CasbinRuleService } from '../service/casbin-rule.service';
import { ResourceDecorator, RoleDecorator } from '@lib/src/common/decorators';

interface User {
  email: string;
  roles: string[];
}

type RequestWithUser = Request & {
  user?: User;
};

@Injectable()
export class CasbinAuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly _casbinRuleService: CasbinRuleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resource = this.reflector.getAllAndOverride(ResourceDecorator, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!resource) return true;

    const role = this.reflector.getAllAndOverride(RoleDecorator, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) return true;

    const request: RequestWithUser = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user || !user.email)
      throw new UnauthorizedException('Usuario no autenticado');

    try {
      const allowed = await this._casbinRuleService.enforce(
        user.email,
        resource,
        request.method,
      );
      return allowed;
    } catch (error) {
      console.error(`Error al verificar permisos:`);
      throw new ForbiddenException('Acceso denegado');
    }
  }
}
