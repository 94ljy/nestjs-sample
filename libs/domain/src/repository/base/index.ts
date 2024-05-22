import { Inject } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export function BaseRepository<T extends ObjectLiteral>(
  entityTarget: EntityTarget<T>,
) {
  class BaseRepository extends Repository<T> {
    @Inject(EntityManager)
    declare readonly manager: EntityManager;

    constructor() {
      super(entityTarget, null as any);
    }
  }

  return BaseRepository as { new (): Repository<T> };
}
