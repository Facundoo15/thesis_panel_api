import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { Public } from '@lib/src/common/decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthenticationService) {}

  @Public()
  @Post('login')
  async login(@Body() request: AuthLoginDTO): Promise<any> {
    return await this._authService.login(request);
  }
}
