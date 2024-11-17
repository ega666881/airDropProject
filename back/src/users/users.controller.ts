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
import { AddBalanceDto, AddCoinsDto, AddCourseDto, AddWalletUserDto, BuyCourseDto, CreateTransactionDto, CreateUserDto, JoinAirdropDto } from './user.dto';

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
  @Get('/get-settings')
  async getSettings() {
    return this.userService.getSettings()
  }

  @ApiTags('users')
  @Put('/add-wallet')
  async addWallet(@Body() dto: AddWalletUserDto) {
    return this.userService.addWalletUser(dto)
  }

  // @ApiTags('users')
  // @Get('/check-transaction/:boc')
  // async checkTransaction(@Param('boc') boc: string) {
  //   return this.userService.checkTransaction(boc)
  // }

  @ApiTags('users')
  @Post('/join-airdrop')
  async JoinAirdropDto(@Body() dto: JoinAirdropDto) {
    return this.userService.joinAirdrop(dto)
  }

  @ApiTags('users')
  @Post('/create-user')
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto)
  }

  @ApiTags('users')
  @Post('/add-coins')
  async addCoins(@Body() dto: AddCoinsDto) {
    return this.userService.addCoins(dto)
  }

  
  @ApiTags('users')
  @Post('/create-transaction')
  async getPayload(@Body() dto: CreateTransactionDto) {
    return this.userService.createPayloadTrans(dto)
  }


  @ApiTags('users')
  @Get('/get-airdrops')
  async getAirdrops() {
    return this.userService.getAirdrops()
  }

}
