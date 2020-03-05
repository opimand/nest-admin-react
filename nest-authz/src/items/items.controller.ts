import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./items.service";
import { User } from "../interfaces/User";
import { RequestInterceptor } from "../interceptors/RequestInterceptor";
// import { UserId } from "../interfaces/user";
import { Users } from "../interfaces/users.interface";
import { Permissions } from "../permissions.decorator";
import { PermissionsGuard } from "../permissions.guard";
import { log } from 'util';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: UsersService) {
    console.log(process.env.PORT)
  }

  @Get()
  @UseInterceptors(RequestInterceptor)
  findAll(@Request() request): Promise<Users> {
    const auth0Query: string = request.auth0Query;
    const token: string = request.headers.authorization;
    console.log('TOKEN CONTR',token)
    return this.itemsService.getUsers(auth0Query, token);
  }

  // @Get(':id')
  // async find(@Param('id') id: number): Promise<User> {
  //   return this.itemsService.find(id);
  // }
  //
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  @Permissions('create:items')
  create(@Body('item') item: User) {
    this.itemsService.addUser(item);
  }
  //
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Put()
  // @Permissions('update:items')
  // update(@Body('item') item: User) {
  //   this.itemsService.update(item);
  // }
  //
  // @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  // @Delete(':id')
  // @Permissions('delete:items')
  // delete(@Param('id') id: number) {
  //   this.itemsService.delete(id);
  // }
}