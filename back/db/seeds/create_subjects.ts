import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("subjects").del();

    // Inserts seed entries
    await knex("subjects").insert([
        { id: 1, name: "ru", imageUrl: "https://i.imgur.com/VrEt83A.png" },
        { id: 2, name: "mat", imageUrl: "" },
        { id: 3, name: "ob", imageUrl: "https://i.imgur.com/s6xGL0E.png" },
        { id: 4, name: "history", imageUrl: "https://i.imgur.com/wLiQFcN.png" },
        { id: 5, name: "bio", imageUrl: "https://i.imgur.com/wiWzaVt.png" },
        { id: 6, name: "him", imageUrl: "https://i.imgur.com/HJDJRlj.png" },
        { id: 7, name: "fiz", imageUrl: "https://i.imgur.com/zGjYcnr.png" },
        { id: 8, name: "inf", imageUrl: "https://i.imgur.com/i7XZLVo.png" },
        { id: 9, name: "litra", imageUrl: "https://i.imgur.com/Gm0qFcq.png" },
        { id: 10, name: "eng", imageUrl: "https://i.imgur.com/pZtMQUu.png" },
        { id: 11, name: "bazmat", imageUrl: "https://i.imgur.com/hI6ap6A.png" },
    ]);
};
