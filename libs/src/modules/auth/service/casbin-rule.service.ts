import { AppConfigService } from '@lib/src/config/app-config.service';
import { Injectable, Logger } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';

@Injectable()
export class CasbinRuleService {
  enforcer: Enforcer;
  private readonly logger = new Logger(CasbinRuleService.name);

  constructor(private readonly configService: AppConfigService) {}

  async onModuleInit() {
    try {
      await this.init();
      this.logger.log('Casbin enforcer initialized successfully');
    } catch (error) {
      this.logger.error('Error initializing Casbin enforcer', error);
    }
  }

  private async init() {
    const adapter = await TypeORMAdapter.newAdapter({
      type: this.configService.DB_TYPE as any,
      host: this.configService.DB_HOST,
      port: this.configService.DB_PORT,
      username: this.configService.DB_USER,
      password: this.configService.DB_PASSWORD,
      database: this.configService.DB_NAME,
    });
    this.enforcer = await newEnforcer(
      'libs/src/modules/auth/config/casbin_model.conf',
      adapter,
    );
  }

  async enforce(sub: string, obj: string, act: string): Promise<boolean> {
    return await this.enforcer.enforce(sub, obj, act);
  }
  async removePolicy(sub: string, obj: string, act: string): Promise<boolean> {
    return await this.enforcer.removePolicy(sub, obj, act);
  }

  async getPolicy(): Promise<string[][]> {
    return await this.enforcer.getPolicy();
  }

  async hasPolicy(sub: string, obj: string, act: string): Promise<boolean> {
    return await this.enforcer.hasPolicy(sub, obj, act);
  }

  async addGroupingPolicy(user: string, role: string): Promise<boolean> {
    return await this.enforcer.addGroupingPolicy(user, role);
  }
  async getRolesForUser(user: string): Promise<string[]> {
    return await this.enforcer.getRolesForUser(user);
  }

  async getUsersForRole(role: string): Promise<string[]> {
    return await this.enforcer.getUsersForRole(role);
  }

  async addRoleForUser(user: string, role: string): Promise<boolean> {
    return await this.enforcer.addRoleForUser(user, role);
  }

  async deleteRoleForUser(user: string, role: string): Promise<boolean> {
    return await this.enforcer.deleteRoleForUser(user, role);
  }

  async getPermissionsForUser(user: string): Promise<string[][]> {
    return await this.enforcer.getPermissionsForUser(user);
  }
  async hasPermissionForUser(
    user: string,
    obj: string,
    act: string,
  ): Promise<boolean> {
    return await this.enforcer.hasPermissionForUser(user, obj, act);
  }
  async getFilteredPolicy(user: string) {
    this.logger.debug(`Fetching policies for user: ${user}`);
    const policies = await this.enforcer.getFilteredGroupingPolicy(0, user);
    this.logger.debug(`Policies found: ${JSON.stringify(policies)}`);

    return policies.filter((policy) => policy[2] !== 'superadmin:superadmin');
  }
}
