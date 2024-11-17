import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("settings").del();

    // Inserts seed entries
    await knex("settings").insert([
        { id: 1, subscribeCost: 0.01, discount: 0,  },

    ]);
};
