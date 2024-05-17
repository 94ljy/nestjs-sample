import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignupRequestDto } from './dto/signupRequest.dto';
import { BaseResponseDto } from '../common/baseResponseDto';
import { UserService } from '@app/domain/service/user/user.service';
import { CreateUserDto } from '@app/domain/service/user/dto/createUser.dto';
import { SigninRequestDto } from './dto/signinRequest.dto';
import { Request } from 'express';
import { RequestUser } from '../common/requestUser';
import { ApiAuthGuard } from '../common/auth.guard';
import { Logger } from '@app/logger';
import { AuthService } from '@app/domain/service/auth/auth.service';
import { LoginDto } from '@app/domain/service/auth/dto/login.dto';
import { SignupDto } from '@app/domain/service/auth/dto/signup.dto';

@Controller('/auth')
export class AuthApiController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @Post('/signup')
  async signup(@Body() signupRequestDto: SignupRequestDto) {
    const signupDto = new SignupDto(
      signupRequestDto.email,
      signupRequestDto.password,
    );

    await this.authService.signup(signupDto);

    return BaseResponseDto.OK();
  }

  @Post('/signin')
  async signin(
    @Req() req: Request,
    @Body() signinRequestDto: SigninRequestDto,
  ) {
    const loginDto = new LoginDto(
      signinRequestDto.email,
      signinRequestDto.password,
    );

    const result = await this.authService.login(loginDto);

    req.session.auth = {
      email: result.email,
      userId: result.id,
    };

    await new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });

    return BaseResponseDto.OK();
  }

  @Get('/whoami')
  @UseGuards(ApiAuthGuard)
  async whoami(@RequestUser() user: RequestUser) {
    return BaseResponseDto.OK_WITH_MESSAGE(user);
  }
}
