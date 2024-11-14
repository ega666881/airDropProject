import { Injectable } from "@nestjs/common";
import { Knex, knex } from "knex";
import knexfile from "db/knexfile";

@Injectable()
export class KnexService {
    knex: Knex
    constructor() {
        this.knex = knex(knexfile.development);
    }
}
