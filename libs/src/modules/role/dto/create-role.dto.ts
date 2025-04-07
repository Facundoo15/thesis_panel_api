import { IsString } from "class-validator";

export class CreateRoleDTO{
    @IsString()
    roleName: string;
}