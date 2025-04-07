import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get DB_HOST(): string {
    return this.configService.get<string>('DB_HOST') ?? 'localhost';
  }

  get DB_TYPE(): string {
    return this.configService.get<string>('DB_TYPE') ?? 'mysql';
  }

  get DB_NAME(): string {
    return this.configService.get<string>('DB_NAME') ?? 'default_db';
  }

  get DB_USER(): string {
    return this.configService.get<string>('DB_USER') ?? 'root';
  }

  get DB_PORT(): number {
    return parseInt(this.configService.get<string>('DB_PORT') ?? '3306', 10);
  }

  get DB_PASSWORD(): string {
    return this.configService.get<string>('DB_PASSWORD') ?? '';
  }

  get DB_LOGGING(): boolean {
    const logging = this.configService.get<string>('DB_LOGGING') ?? 'false';
    return logging.toLowerCase() === 'true' || logging === '1';
  }

  get JWT_SECRET(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get JWT_EXPIRES_IN(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN');
  }
}
