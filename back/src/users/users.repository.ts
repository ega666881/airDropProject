import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { CreateUserDto } from "./user.dto";
import { IUser, IAirdrop, IAirdropUser, IAirdropHistory, IReferal, ITransaction, ISettings } from './interfaces';
import { KnexService } from "./user.knex";

@Injectable()
export class UserRepository {
    tableNames = {
        users: "users",
        airdrops: "airdrops",
        airdropsUsers: "airdropsUsers",
        airdropsHistory: "airdropsHistory",
        referals: "referals",
        transactions: "transactions",
        settings: "settings"
    };
    knex: Knex;
    constructor(private readonly knexService: KnexService) {
        this.knex = knexService.knex;
    }

    async createUser(tgId: number, username: string): Promise<IUser> {
        const insertedUser = await this.knex<IUser>(this.tableNames.users).insert({tgId: tgId, balance: 0, username: username}).returning('*')
        return insertedUser[0]

    }

    async addReferal(userId: number, referalId: number) {
        return this.knex(this.tableNames.referals).insert({userId: userId, referalId: referalId})
    }

    async createTransaction(userId: number, amount: number = 0.1): Promise<ITransaction> {
        const settings = await this.getSettings()
        const transaction = await this.knex(this.tableNames.transactions).insert({userId: userId, amount: settings.subscribeCost}).returning('*')
        return transaction[0]
    }

    async updateReferalUser(userId: number, referalId: number, profit: number) {
        await this.knex(this.tableNames.referals).update({profit: this.knex.raw((`profit + ${profit}`))}).where({userId: userId, referalId: referalId})
    }

    async getCountAirdropsUsers(airdropId: number) {
        return this.knex(this.tableNames.airdropsUsers).count().where({airdropId: airdropId}).first()
    }

    async addBalanceUser(tgId: number, amount: number) {
        await this.knex(this.tableNames.users).update({balance: this.knex.raw(`balance + ${amount}`)}).where({tgId: tgId})
        return true
    }

    async getSettings(): Promise<ISettings> {
        return this.knex(this.tableNames.settings).select('*').first()
    }

    async getAirdrops(id?: number): Promise<IAirdrop> {
        const query = this.knex(this.tableNames.airdrops).select('*')
        id && query.where({id: id}).first()
        //@ts-ignore
        return query

    }   

    async updateWalletAirdropsUsers(userId: number, wallet: string) {
        await this.knex(this.tableNames.airdropsUsers).update({wallet: wallet}).where({userId: userId}) 
    }

    async updateWinCoinsAirdropsUsersById(id: number, winCoins: number) {
        await this.knex(this.tableNames.airdropsUsers).update({winCoins: winCoins}).where({id: id}) 
    }

    async createAirdropsHistory(userId: number, winCoins: number, airdropName: string) {
        await this.knex(this.tableNames.airdropsHistory).insert({userId: userId, profit: winCoins, airdropName: airdropName})
        return true
    }

    async getTransactions(userId: number) {
        return this.knex(this.tableNames.transactions).select('*').where({userId: userId, active: true})
    }

    async getTransactionById(id: number) {
        return this.knex(this.tableNames.transactions).select('*').where({id: id, active: true}).first()
    }

    async addAirdropsUsers(airdropId: number, userId: number) {
        return this.knex(this.tableNames.airdropsUsers).insert({airdropId: airdropId, userId: userId})
    }

    async setTransactionInactive(transactionId: number) {
        return this.knex(this.tableNames.transactions).update({active: false}).where({id: transactionId})
    }

    async updateAirdrop(updatedData: object, airdropId: number) {
        return this.knex(this.tableNames.airdrops).update(updatedData).where({id: airdropId})
    }

    async updateUser(updatedData: IUser, userId?: number, tgId?: number) {
        const query = this.knex(this.tableNames.users).update(updatedData)
        userId && query.where({id: userId})
        tgId && query.where({tgId: tgId})
        await query
        return true
    }

    async addCoinsAirdrop(userId: number, airdropId: number, coins: number) {
        await this.knex(this.tableNames.airdropsUsers).update({coins: this.knex.raw(`coins + ${coins}`)}).where({userId: userId, airdropId: airdropId})
        return true
    }

    async updateWinCoinsAll(airdropId: number, coins: number) {
        await this.knex(this.tableNames.airdropsUsers).update({winCoins: coins}).where({airdropId: airdropId})
        return true
    }

    async getCoinsSum(airdropId: number) {
        return this.knex(this.tableNames.airdropsUsers).sum('coins as total').where({airdropId: airdropId}).first()
    }

    async getAirdropsUsers(userId: number, airdropId: number) {
        return this.knex(this.tableNames.airdropsUsers).select('*').where({userId: userId, airdropId: airdropId}).first()
    }

    async getAirdropsUsersByAirdropId(airdropId: number) {
        return this.knex(this.tableNames.airdropsUsers).select('*').where({airdropId: airdropId}).orderBy('coins', 'desc')
    }


    async getUser(userId?: number, tgId?: number): Promise<IUser> {
        const airdropsSubquery = this.knex('airdropsHistory')
            .select('userId')
            .groupBy('userId')
            .select(this.knex.raw('json_agg("airdropsHistory") AS "airdropsHistory"'));

        const airdropsUsersSubquery = this.knex('airdropsUsers')
            .select('userId')
            .groupBy('userId')
            .select(this.knex.raw('json_agg("airdropsUsers") AS "airdropsUsers"'));

        const referralsSubquery = this.knex('referals')
            .join('users', 'users.id', 'referals.referalId')
            .select('userId')
            .groupBy('userId')
            .select(this.knex.raw("json_agg(json_build_object('id', referals.id, 'profit', referals.profit, 'username', users.username)) AS referals"));

        const query = this.knex('users as u')
            .leftJoin(airdropsSubquery.as('airdrops'), 'airdrops.userId', 'u.id')
            .leftJoin(referralsSubquery.as('referrals'), 'referrals.userId', 'u.id')
            .leftJoin(airdropsUsersSubquery.as('airdropsUsers1'), 'airdropsUsers1.userId', 'u.id')
            .select(
                'u.*',
                this.knex.raw(`COALESCE("airdropsUsers1"."airdropsUsers", '[]'::json) AS "airdropsUsers"`),
                this.knex.raw(`COALESCE(airdrops."airdropsHistory", '[]'::json) AS "airdropsHistory"`),
                this.knex.raw(`COALESCE(referrals.referals, '[]'::json) AS referals`),
                
            )
            .orderBy('u.id', 'asc')
            
            
            if (userId) {
                query.where('u.id', userId).first()
                //@ts-ignore
                return query
            } else if (tgId) {
                query.where('u.tgId', tgId).first()
            }
        //@ts-ignore
        return query
    }



}
   