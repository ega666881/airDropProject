import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import * as dotenv from 'dotenv-ts';

import { UserRepository } from './users.repository';
import { AddBalanceDto, AddCoinsDto, AddCourseDto, AddWalletUserDto, BuyCourseDto, CreateTransactionDto, CreateUserDto, JoinAirdropDto} from './user.dto';
import TonWeb from 'tonweb'
import { KnexService } from './user.knex';
import { IUser, IAirdrop, IAirdropUser, IAirdropHistory, IReferal } from './interfaces';
import { beginCell } from '@ton/ton'
import { TonClient } from 'ton';
import { Address } from 'ton-core';

dotenv.config();
@Injectable()
export class UsersService {
  salt: string;
  knex: Knex;
  tonweb: any
  constructor(private readonly knexService: KnexService, private readonly userRepository: UserRepository) {
    this.knex = knexService.knex
    this.salt = genSaltSync(10)
  }


  async getAirdrops(): Promise<IAirdrop[] | IAirdrop> {
    let airdops = await this.userRepository.getAirdrops()
    console.log(Math.floor((new Date().getTime() + 1000) / 1000))
    //@ts-ignore
    airdops.map(async (airdrop: IAirdrop) => {
      if (Math.floor(new Date().getTime() / 1000) >= airdrop.endDate) {
        await this.userRepository.updateAirdrop({stoped: true}, airdrop.id)
        
      }
    })
    return this.userRepository.getAirdrops()
  }  

  async createPayloadTrans(dto: CreateTransactionDto): Promise<object> {
    const transaction = await this.userRepository.createTransaction(dto.userId)
    const body = beginCell()
      .storeUint(0, 32)
      .storeStringTail(transaction.id.toString())
      .endCell()

    return {"payload": body.toBoc().toString("base64")}
  }

  async addWalletUser(dto: AddWalletUserDto) { 
    await this.userRepository.updateUser({wallet: dto.wallet}, undefined, dto.tgId)
    return this.userRepository.getUser(undefined, dto.tgId)
  }

  async addCoins(dto: AddCoinsDto) {
    await this.userRepository.addCoinsAirdrop(dto.userId, dto.airdropId, dto.coins)
    return this.userRepository.getUser(dto.userId)
  }

  async getSettings() {
    return this.userRepository.getSettings()
  }

  async joinAirdrop(dto: JoinAirdropDto) {
    const airdrop = await this.userRepository.getAirdrops(dto.airdropId)
    const {count} = await this.userRepository.getCountAirdropsUsers(dto.airdropId)
    const airdropUsers = await this.userRepository.getAirdropsUsers(dto.userId, dto.airdropId)
    const user = await this.userRepository.getUser(dto.userId)
    if (airdropUsers) {
      throw new HttpException("Пользователь уже в эйрдропе", HttpStatus.BAD_REQUEST)

    } else {
      //@ts-ignore
      if (count >= airdrop.maxUsers) {
        throw new HttpException('Количество пользователей максимум', HttpStatus.CONFLICT)

      } else {
        if (airdrop.subscribeCheck) {
          const response = await fetch(`${process.env.BOT_URL}/check-subscrition`, {method: 'POST', 
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            channelId: airdrop.channelId,
            tgId: user.tgId
          })})
          const data = await response.json()
          if (data.check) {
            await this.userRepository.addAirdropsUsers(dto.airdropId, dto.userId)
            return this.userRepository.getUser(dto.userId)
          } else {
            throw new HttpException("Пользователь не подписан на канал", HttpStatus.BAD_GATEWAY)
          }

        } else {
          await this.userRepository.addAirdropsUsers(dto.airdropId, dto.userId)
          return this.userRepository.getUser(dto.userId)
        }
        
      }
    }

  }

  async getUserByTgId(tgId: number): Promise<IUser | IUser[]> {
    let user = await this.userRepository.getUser(undefined, tgId)
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
    }
    //@ts-ignore
    const transactions = await this.userRepository.getTransactions(user.id)
    if (transactions.length > 0) {
      //@ts-ignore
      const response = await fetch(`https://toncenter.com/api/v2/getTransactions?address=${user.wallet}&limit=20&to_lt=0&archival=true`)
      const tonTransactions = await response.json()
      tonTransactions.result.map((transaction) => {
        transaction.out_msgs.map( async (msg) => {
          try {
            const trx = await this.userRepository.getTransactionById(Number(msg.message))
            if (trx) {
              await this.userRepository.setTransactionInactive(trx.id)
              await this.userRepository.updateUser({subscription: true}, trx.userId)
              const updatedUser = await this.userRepository.getUser(trx.userId)
              //@ts-ignore
              const referal = await this.knex('referals').select('*').leftJoin('users', 'users.id', 'referals.userId').where({referalId: updatedUser.id}).first()
              if (referal) {
                if (referal.wallet.length > 0) updatedUser['referalWallet'] = referal.wallet
              }
              return updatedUser
            }
          } catch {
            
          }
        })
      })
    }
    //@ts-ignore
    const referal = await this.knex('referals').select('*').leftJoin('users', 'users.id', 'referals.userId').where({referalId: user.id}).first()
    if (referal) {
      if (referal.wallet.length > 0) user['referalWallet'] = referal.wallet
    }
    return user
  }  

}
