import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('airdropsUsers', function(table: Knex.CreateTableBuilder) {
        table.integer('winCoins').notNullable().defaultTo(0)
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('airdropsUsers', function(table: Knex.CreateTableBuilder) {
        table.dropColumn('winCoins')
    })

}

