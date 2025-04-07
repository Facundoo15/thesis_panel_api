import { Inject } from '@nestjs/common';
import {
  IUserService,
  USER_SERVICE_KEY,
} from '../../user/contracts/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { compare } from 'bcrypt';
import { InvalidPasswordException } from '../exceptions/invalid-password.error';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { UserNotEmail } from '../../user/exceptions/user-not-email.error';

export class AuthenticationService {
  constructor(
    @Inject(USER_SERVICE_KEY) private readonly _userService: IUserService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(request: AuthLoginDTO): Promise<AuthResponseDTO> {
    const user = await this._userService.findByEmail(request.email);
    if (!user) throw new UserNotEmail(request.email);

    const isPasswordValid = await compare(request.password, user.password);
    if (!isPasswordValid) throw new InvalidPasswordException();

    const payload = {
      subject: user.id,
      email: user.email,
    };

    const token = await this._jwtService.signAsync(payload);
    const decodedToken = this._jwtService.decode(token) as any;

    return new AuthResponseDTO(
      user.id,
      user.email,
      token,
      decodedToken?.exp ? decodedToken.exp * 1000 : null,
      user.role?.roleName || 'user', 
      user.firstName,
      user.lastName,
    );
  }
}
