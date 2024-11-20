import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import * as dotenv from 'dotenv-ts';

import { UserRepository } from './users.repository';
import { AddBalanceDto, AddCoinsDto, AddCourseDto, AddWalletUserDto, BuyCourseDto, CreateTransactionDto, CreateUserDto, JoinAirdropDto, StopAirdropDto} from './user.dto';
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


  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.getUser(undefined, dto.tgId)
    if (user) {
      throw new HttpException("Пользователь уже существует", HttpStatus.CONFLICT)

    } else {
      const insertedUser = await this.userRepository.createUser(dto.tgId, dto.username)
      if (dto.referalId) {
        await this.userRepository.addReferal(dto.referalId, insertedUser.id)
      }

      return this.userRepository.getUser(undefined, dto.tgId)
    }
    
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
    await this.userRepository.updateUser({wallet: dto.wallet}, dto.userId)
    await this.userRepository.updateWalletAirdropsUsers(dto.userId, dto.wallet)
    return this.userRepository.getUser(dto.userId)
  }

  async addCoins(dto: AddCoinsDto) {
    await this.userRepository.addCoinsAirdrop(dto.userId, dto.airdropId, dto.coins)
    return this.userRepository.getUser(dto.userId)
  }

  async finishAirdrop(dto: StopAirdropDto) {
    const airdrop = await this.userRepository.getAirdrops(dto.airdropId)
    const airdropsUsers = await this.userRepository.getAirdropsUsersByAirdropId(dto.airdropId)
    if (airdrop.miniGame) {
      const {total} = await this.userRepository.getCoinsSum(dto.airdropId)
      airdropsUsers.map( async (airdropUser) => {
        const winCoins = Math.round(airdropUser.coins / total * airdrop.totalCoins)
        await this.userRepository.updateWinCoinsAirdropsUsersById(airdropUser.id, winCoins)
        await this.userRepository.createAirdropsHistory(airdropUser.userId, winCoins, airdrop.name)
      })
      return {success: true}

    } else {
      const {count} = await this.userRepository.getCountAirdropsUsers(airdrop.id)
      const winCoins = Math.round(airdrop.totalCoins / Number(count))
      await this.userRepository.updateWinCoinsAll(airdrop.id, winCoins)
      airdropsUsers.map(async (airdropUser) => {
        await this.userRepository.createAirdropsHistory(airdropUser.userId, winCoins, airdrop.name)
      })
      return {success: true}
    } 
     
  }
 
  async stopAirdrop(dto: StopAirdropDto) {
    await this.userRepository.updateAirdrop({stoped: true}, dto.airdropId)
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
      if (!user.subscription) {
        throw new HttpException("У пользователя нету подписки", HttpStatus.CONFLICT)
      }
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
    if (user.subscription) {
      if (Math.floor((new Date().getTime()) / 1000) >= user.subscribeEndDate) {
        await this.userRepository.updateUser({subscribeEndDate: 0, subscription: false}, user.id)
      }
      
    }
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
              await this.userRepository.updateUser({subscription: true, subscribeEndDate: this.knex.raw(`subscribeEndDate + ${Math.floor((new Date().getTime() + 2629746) / 1000)}`)}, trx.userId)
              const updatedUser = await this.userRepository.getUser(trx.userId)
              //@ts-ignore
              const referal = await this.knex('referals').select('*').leftJoin('users', 'users.id', 'referals.userId').where({referalId: updatedUser.id}).first()
              if (referal) {
                if (referal.wallet.length > 0) {
                  const addProfit = trx.amount * 40 / 100
                  await this.userRepository.updateReferalUser(referal.id, updatedUser.id, addProfit)
                  updatedUser['referalWallet'] = referal.wallet
                }
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
