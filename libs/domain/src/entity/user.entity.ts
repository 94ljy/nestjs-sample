import { Column, Entity, Index } from 'typeorm';
import { RootEntity } from './base';

const emailKeyName = 'email';

@Entity({ name: 'user' })
@Index([emailKeyName], { unique: true })
export class User extends RootEntity {
  @Column({ name: 'email' })
  [emailKeyName]: string;

  @Column({ name: 'email_verified_at', type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  constructor(email: string) {
    super();
    this.email = email;
    this.emailVerifiedAt = null;
  }
}
