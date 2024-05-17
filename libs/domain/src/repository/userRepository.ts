import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { BaseRepository } from './base';

@Injectable()
export class UserRepository extends BaseRepository(User) {
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: { email },
    });

    return user;
  }
}
