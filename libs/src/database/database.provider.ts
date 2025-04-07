import { AppConfigService } from '@lib/src/config/app-config.service';
import { DataSource } from 'typeorm';
import { RoleSchema } from './typeorm/models';
import { UserSchema } from './typeorm/models/user.model';

export const DATA_SOURCE = Symbol('DATA_SOURCE');

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: AppConfigService) => {
      const dataSource = new DataSource({
        type: configService.DB_TYPE as any,
        host: configService.DB_HOST,
        port: configService.DB_PORT,
        username: configService.DB_USER,
        password: configService.DB_PASSWORD,
        database: configService.DB_NAME,
        entities: [RoleSchema, UserSchema],
        logging: configService.DB_LOGGING,
        synchronize: true,
      });
      return await dataSource.initialize();
    },
    inject: [AppConfigService],
  },
];
