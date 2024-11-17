import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.bigInteger('tgId').notNullable()
        table.float('balance').notNullable().defaultTo(0)
        table.boolean('subscription').notNullable().defaultTo(false)
        table.string('username').notNullable().defaultTo('')
        
    })

    await knex.schema.createTable('airdrops', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.string('name').notNullable().defaultTo('')
        table.boolean('subscribeCheck').notNullable().defaultTo(false)
        table.string('channelId').nullable()
        table.boolean('miniGame').defaultTo(false)
        table.string('coinLogoUrl').nullable()
        table.string('backgroundUrl').nullable()
        table.float('totalCoins').notNullable().defaultTo(0)
        table.text('projectInfo').notNullable().defaultTo('')
        table.string('channelUrl').nullable()
        table.float('endDate').notNullable().defaultTo(0)
    })

    await knex.schema.createTable('airdropsUsers', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.foreign('userId').references('users.id').onDelete('cascade')
        table.integer('airdropId').unsigned()
        table.foreign('airdropId').references('airdrops.id').onDelete('cascade')
    })

    await knex.schema.createTable('airdropsHistory', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.foreign('userId').references('users.id').onDelete('cascade')
        table.string('airdropName').notNullable().defaultTo('')
        table.float('profit').notNullable().defaultTo('0')
    })

    await knex.schema.createTable('referals', function(table: Knex.CreateTableBuilder) {
        table.increments('id').primary()
        table.integer('userId').unsigned()
        table.foreign('userId').references('users.id').onDelete('cascade')
        table.integer('referalId').unsigned()
        table.foreign('referalId').references('users.id').onDelete('cascade')
        table.float('profit').notNullable().defaultTo(0)
    })
    

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('referals')
    await knex.schema.dropTable('airdropsHistory')
    await knex.schema.dropTable('airdropsUsers')
    await knex.schema.dropTable('airdrops')
    await knex.schema.dropTable('users')
    
}

