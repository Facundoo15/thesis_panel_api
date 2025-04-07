import { IsString } from "class-validator";

export class UpdateRoleDTO{
    @IsString()
    name: string;
}