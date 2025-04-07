import { EntitySchemaColumnOptions } from "typeorm";

export const BaseColumnSchemaPart = {
    id: {
        type: Number,
        primary: true,
        name: 'id',
        generated: true
    } as EntitySchemaColumnOptions,
    createdAt: {
        type: 'timestamp',
        name: 'created_at',
        createDate: true
    } as EntitySchemaColumnOptions,
    updateAt: {
        type: 'timestamp',
        name: 'updated_at',
        updateDate: true
    } as EntitySchemaColumnOptions,
    deletedAt: {
        type: 'timestamp',
        name: 'deleted_at',
        deleteDate: true
    } as EntitySchemaColumnOptions
}