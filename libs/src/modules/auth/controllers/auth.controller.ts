import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { Public } from '@lib/src/common/decorators';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthenticationService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener un token JWT' })
  @ApiBody({ type: AuthLoginDTO })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso, retorna JWT y usuario',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() request: AuthLoginDTO): Promise<any> {
    return await this._authService.login(request);
  }
}
