import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ALLOW, IS_PUBLIC_BASIC_KEY, IS_PUBLIC_KEY } from '../contracts';

export const ResourceDecorator = Reflector.createDecorator<string>();
export const RoleDecorator = Reflector.createDecorator<string>();

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const PublicBasic = () => SetMetadata(IS_PUBLIC_BASIC_KEY, true);
export const Allow = () => SetMetadata(ALLOW, true);
