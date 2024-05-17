import { Inject } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export function BaseRepository<T extends ObjectLiteral>(a: EntityTarget<T>) {
  class BaseRepository extends Repository<T> {
    @Inject(EntityManager)
    declare readonly manager: EntityManager;

    constructor() {
      super(a, null as any);
    }
  }

  return BaseRepository as { new (): Repository<T> };
}
