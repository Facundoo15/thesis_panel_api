import { Role } from "../models";
import {CreateRoleDTO, UpdateRoleDTO} from "../dto";


export const ROLE_SERVICE_KEY = Symbol('IRoleService');

export interface IRoleService{
    create(data: CreateRoleDTO): Promise<Role>;
    update(id: number, data: UpdateRoleDTO): Promise<Role | null>;
    findById(id: number): Promise<Role | null>;
    findAll(): Promise<Role[]>
    delete(id: number): Promise<void>
}