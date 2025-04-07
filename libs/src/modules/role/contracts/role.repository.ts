import {IReadableRepository, IWriteableRepository} from '@lib/src/common/contracts';

import { Role } from '../models';


export const ROLE_REPOSITORY_KEY = Symbol('IRoleRepository')

export interface IRoleRepository extends IReadableRepository<Role>, IWriteableRepository<Role>{
    
}