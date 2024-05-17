import { RequestUser } from './common/requestUser';

declare module 'express-session' {
  interface SessionData {
    auth: RequestUser;
  }
}
