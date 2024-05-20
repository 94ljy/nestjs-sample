import { SetMetadata } from '@nestjs/common';

export const publicKey = Symbol('publicKey');

export const Public = () => SetMetadata(publicKey, true);
