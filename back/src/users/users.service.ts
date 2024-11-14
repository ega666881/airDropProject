import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import * as dotenv from 'dotenv-ts';

import { UserRepository } from './users.repository';
import { AddBalanceDto, AddCourseDto, BuyCourseDto, CreateTransactionDto, CreateUserDto} from './user.dto';
import TonWeb from 'tonweb'
import { KnexService } from './user.knex';
import { IUser, IAirdrop, IAirdropUser, IAirdropHistory, IReferal } from './interfaces';




dotenv.config();
@Injectable()
export class UsersService {
  salt: string;
  knex: Knex;

  constructor(private readonly knexService: KnexService, private readonly userRepository: UserRepository) {
    this.knex = knexService.knex
    this.salt = genSaltSync(10)
  }


  async getAirdrops(): Promise<IAirdrop[]> {
    // const date = new Date('2024-11-15T00:00:00Z')
    // const seconds = Math.floor(date.getTime());
    // console.log(seconds);
    return this.userRepository.getAirdrops()
  }  

  async getUserByTgId(tgId: number): Promise<IUser | IUser[]> {
    return this.userRepository.getUser(undefined, tgId)
  }  

}
