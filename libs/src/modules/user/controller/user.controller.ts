import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IUserService, USER_SERVICE_KEY } from '../contracts/user.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_KEY) private readonly _userService: IUserService,
  ) {}

  @Post()
  async createUser(@Body() request: CreateUserDTO) {
    return await this._userService.create(request);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this._userService.getById(+id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return await this._userService.findByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return await this._userService.findAll();
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() request: UpdateUserDTO) {
    return await this._userService.update(+id, request);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this._userService.delete(id);
  }
}
