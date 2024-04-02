import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from '../decorators/active-user.decorator';
import { Role } from 'src/user/enums/role.enum';
import { Roles } from '../authorization/decorators/roles.decorator';

@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('registration')
  registration(@Body() registrationDto: RegistrationDto) {
    return this.authService.registration(registrationDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@ActiveUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @Auth(AuthType.Bearer)
  @Roles(Role.Admin, Role.Teacher, Role.Student)
  @HttpCode(HttpStatus.OK)
  @Get('user')
  getActiveUser(@ActiveUser('sub') userId: string) {
    return this.authService.getActiveUser(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
