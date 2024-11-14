import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Headers,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
  Request,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ActiveTokenGuard } from 'src/middlewares/auth.middleware';
import { AddBalanceDto, AddCourseDto, BuyCourseDto, CreateTransactionDto, CreateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @ApiTags('users')
  // @Put('/update-user')
  // @ApiHeader({name: 'active-token'})
  // @UseGuards(ActiveTokenGuard)
  // async updateUser(@Body() dto: UpdateUserDto) {
  //   return this.userService.removeActiveToken(dto)
    
  // }

  @ApiTags('users')
  @Get('/get-user/:id')
  async getUser(@Param('id') tgId: number) {
    return this.userService.getUserByTgId(tgId)
  }

  @ApiTags('users')
  @Get('/get-airdrops')
  async getAirdrops() {
    return this.userService.getAirdrops()
  }

}
