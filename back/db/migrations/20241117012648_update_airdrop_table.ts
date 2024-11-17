import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('airdrops', function(table: Knex.CreateTableBuilder) {
        table.boolean('stoped').notNullable().defaultTo(false)
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('airdrops', function(table: Knex.CreateTableBuilder) {
        table.dropColumn('stoped')
    })

}

