import { Injectable } from '@nestjs/common';

type NodeEnv = 'local' | 'development' | 'staging' | 'production';

@Injectable()
export class AppConfig {
  nodeEnv: NodeEnv = (process.env.NODE_ENV as NodeEnv) ?? 'local';
  sessionSecret: string = process.env.SESSION_SECRET ?? '';
}
