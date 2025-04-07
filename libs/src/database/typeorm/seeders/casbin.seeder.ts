import { AppConfigService } from '@lib/src/config/app-config.service';
import {
  IUserRepository,
  USER_REPOSITORY_KEY,
} from '@lib/src/modules/user/contracts/user.repository';
import { Inject, Logger } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';
import { Seeder } from 'nestjs-seeder';
import TypeORMAdapter from 'typeorm-adapter';

export class CasbinSeeder implements Seeder {
  enforcer: Enforcer;
  private readonly logger = new Logger(CasbinSeeder.name);
  configService: AppConfigService;
  constructor(
    configService: AppConfigService,
    @Inject(USER_REPOSITORY_KEY)
    private readonly userRepository: IUserRepository,
  ) {
    this.configService = configService;
  }
  async onModuleInit() {
    try {
      // await this.init(this.configService);
      //await this.seed();
    } catch (error) {
      this.logger.error('Error initializing Casbin enforcer', error);
    }
  }
  async init(configService: AppConfigService) {
    const adapter = await TypeORMAdapter.newAdapter({
      type: configService.DB_TYPE as any,
      host: configService.DB_HOST,
      port: configService.DB_PORT,
      username: configService.DB_USER,
      password: configService.DB_PASSWORD,
      database: configService.DB_NAME,
    });

    const enforcer = await newEnforcer(
      'libs/src/modules/auth/config/casbin_model.conf',
      adapter,
    );
    this.enforcer = enforcer;
  }
  async seed(): Promise<any> {
    // Definir permisos por rol
    const rolePolicies = {
      superadmin: {
        users: ['GET', 'POST', 'PUT', 'DELETE'],
        thesis: ['GET', 'POST', 'PUT', 'DELETE'],
        thesis_review: ['GET', 'POST', 'PUT', 'DELETE'],
        courses: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      professor: {
        thesis: ['GET', 'REVIEW'],
        thesis_review: ['GET', 'COMMENT', 'APPROVE'],
      },
      student: {
        thesis: ['SUBMIT', 'GET'],
        thesis_review: ['GET'],
      },
    };

    // Asignar políticas en Casbin
    for (const [role, resources] of Object.entries(rolePolicies)) {
      for (const [resource, actions] of Object.entries(resources)) {
        for (const action of actions) {
          await this.enforcer.addPolicy(role, resource, action);
        }
      }
    }

    // Asignar roles a usuarios en la base de datos
    const users = await this.userRepository.findAll();
    for (const user of users) {
      await this.enforcer.addGroupingPolicy(user.email, user.role.roleName);
    }

    console.log('Casbin seeding completed.');
  }

  async drop(): Promise<any> {
    console.log('Dropping Casbin policies...');
    this.enforcer.clearPolicy();
  }
}
