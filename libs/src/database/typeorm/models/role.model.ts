import { EntitySchema } from "typeorm";
import {Role} from '@lib/modules/role/models'
import { BaseColumnSchemaPart } from "./base.schema";

export const RoleSchema = new EntitySchema<Role>({
    name: 'Role',
    tableName: 'roles',
    columns: {
        ...BaseColumnSchemaPart,
        roleName: {
            type: String,
            name: 'role_name'
        }
    }
})