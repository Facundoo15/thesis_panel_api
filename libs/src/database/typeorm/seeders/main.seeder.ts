import { AppModule } from '@lib/src/app.module';
import { seeder } from 'nestjs-seeder';
import { CasbinSeeder } from './casbin.seeder';

seeder({
  imports: [AppModule],
}).run([CasbinSeeder]);
