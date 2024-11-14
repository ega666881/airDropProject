import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import knex, { Knex } from 'knex';
import knexfile from '../../db/knexfile';
import { CreateUserDto } from "./user.dto";
import { IUser, IAirdrop, IAirdropUser, IAirdropHistory, IReferal } from './interfaces';
import { KnexService } from "./user.knex";

@Injectable()
export class UserRepository {
    tableNames = {
        users: "users",
        airdrops: "airdrops",
        airdropsUsers: "airdropsUsers",
        airdropsHistory: "airdropsHistory",
        referals: "referals"
    };
    knex: Knex;
    constructor(private readonly knexService: KnexService) {
        this.knex = knexService.knex;
    }

    async createUser(tgId: number): Promise<IUser> {
        const insertedUser = await this.knex<IUser>(this.tableNames.users).insert({tgId: tgId, balance: 0}).returning('*')
        return insertedUser[0]

    }

    async addBalanceUser(tgId: number, amount: number) {
        await this.knex(this.tableNames.users).update({balance: this.knex.raw(`balance + ${amount}`)}).where({tgId: tgId})
        return true
    }

    async getAirdrops(id?: number) {
        const query = this.knex(this.tableNames.airdrops).select('*')
        id && query.where({id: id}).first()
        return query

    }   

    async getUser(userId?: number, tgId?: number): Promise<IUser | IUser[]> {
        const airdropsSubquery = this.knex('airdropsHistory')
        .select('userId')
        .groupBy('userId')
        .select(this.knex.raw('json_agg("airdropsHistory") AS "airdropsHistory"'));


        const referralsSubquery = this.knex('referals')
            .join('users', 'users.id', 'referals.referalId')
            .select('userId')
            .groupBy('userId')
            .select(this.knex.raw("json_agg(json_build_object('id', referals.id, 'profit', referals.profit, 'username', users.username)) AS referals"));

        const query = this.knex('users as u')
            .leftJoin(airdropsSubquery.as('airdrops'), 'airdrops.userId', 'u.id')
            .leftJoin(referralsSubquery.as('referrals'), 'referrals.userId', 'u.id')
            .select(
                'u.*',
                this.knex.raw(`COALESCE(airdrops."airdropsHistory", '[]'::json) AS airdropsHistory`),
                this.knex.raw(`COALESCE(referrals.referals, '[]'::json) AS referals`)
            )
            .orderBy('u.id', 'asc')
            
            console.log(query.toQuery())
            if (userId) {
                query.where('u.id', userId).first()
                return query
            } else if (tgId) {
                query.where('u.tgId', tgId).first()
            }
        
        return query
    }



}
   