import { Auth } from '../entity/auth.entity';
import { BaseRepository } from './base';

export class AuthRepository extends BaseRepository(Auth) {
  async findByUserId(userId: string) {
    const result = await this.findOne({ where: { userId } });
    return result;
  }
}
