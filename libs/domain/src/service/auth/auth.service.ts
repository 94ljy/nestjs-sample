import { Auth } from '@app/domain/entity/auth.entity';
import { User } from '@app/domain/entity/user.entity';
import { AuthRepository } from '@app/domain/repository/authRepository';
import { UserRepository } from '@app/domain/repository/userRepository';
import { Logger } from '@app/logger';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { InvalidRequestError } from '@app/domain/error/invalidRequest.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async signup(signupDto: SignupDto) {
    const user = await this.userRepository.findByEmail(signupDto.email);

    if (user !== null) {
      throw new InvalidRequestError('User already exists');
    }

    const newUser = await this.userRepository.save(new User(signupDto.email));

    const newAuth = new Auth();
    // TODO: hash password
    newAuth.password = signupDto.password;
    newAuth.userId = newUser.id;

    await this.authRepository.save(newAuth);

    this.logger.log(`User ${newUser.email} signed up`, this.signup.name);

    return newUser;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (user === null) {
      throw new InvalidRequestError('User not found');
    }

    const auth = await this.authRepository.findByUserId(user.id);

    if (auth === null) {
      throw new InvalidRequestError('Auth not found');
    }

    const isLogin = auth.login(loginDto.password);

    if (!isLogin) {
      throw new InvalidRequestError('Password is incorrect');
    }

    await this.authRepository.save(auth);

    this.logger.log(`User ${user.id} logged in`, this.login.name);

    return user;
  }
}
