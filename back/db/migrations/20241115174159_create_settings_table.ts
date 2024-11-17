import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('settings', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.float('subscribeCost').notNullable().defaultTo(0)
        table.float('discount').notNullable().defaultTo(0)
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('settings')
}

