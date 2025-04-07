import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { CasbinRuleService } from './service/casbin-rule.service';
import { AuthenticationService } from './service/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AppConfigService } from '@lib/src/config/app-config.service';
import { AppConfigModule } from '@lib/src/config/app-config.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: AppConfigService) => ({
        global: true,
        secret: configService.JWT_SECRET,
        signOptions: {
          expiresIn: configService.JWT_EXPIRES_IN,
        },
      }),

      imports: [AppConfigModule],
      inject: [AppConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [CasbinRuleService, AuthenticationService],
  exports: [CasbinRuleService, AuthenticationService],
})
export class AuthModule {}
