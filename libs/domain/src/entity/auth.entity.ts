import { Column, Entity } from 'typeorm';
import { RootEntity } from './base';

@Entity({ name: 'auth' })
export class Auth extends RootEntity {
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt: Date | null;

  @Column({ name: 'user_id' })
  userId: string;

  login(password: string) {
    if (this.password !== password) {
      return false;
    }

    this.lastLoginAt = new Date();
    return true;
  }
}
