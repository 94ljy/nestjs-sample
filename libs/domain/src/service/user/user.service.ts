import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Logger } from '@app/logger';
import { UserRepository } from '../../repository/userRepository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const alreadyUser = await this.userRepository.findByEmail(
  //     createUserDto.email,
  //   );

  //   if (alreadyUser !== null) {
  //     throw new Error('User already exists');
  //   }

  //   // TODO: use password hashing
  //   const newUser = new User(createUserDto.email);

  //   const result = await this.userRepository.save(newUser);

  //   return result;
  // }

  // async login(loginDto: LoginDto) {
  //   const user = await this.userRepository
  //     .findByEmail(loginDto.email)
  //     .then((user) => {
  //       if (user === null) {
  //         throw new Error('User not found');
  //       }

  //       return user;
  //     });

  //   if (!user.login(loginDto.password)) {
  //     throw new Error('Invalid password');
  //   }

  //   this.logger.log(this.login.name, 'hello');

  //   const result = await this.userRepository.save(user);

  //   return result;
  // }
}
