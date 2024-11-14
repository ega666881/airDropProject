import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("schools").del();

    // Inserts seed entries
    await knex("schools").insert([
        { id: 1, name: "У🐻скул", imageUrl: "https://i.imgur.com/2tTgfVP.png", mongoId: "66c7c315bd3a1dbe87d5464b" },
        { id: 2, name: "🐻Умскул (Основной курс)", imageUrl: "https://i.imgur.com/2tTgfVP.png", mongoId: "66cf907dab539ea85d133ed9" },
        { id: 3, name: "Ксения Напольская (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf965bab539ea85d133ee6" },
        { id: 4, name: "Марк Ламарк (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf907dab539ea85d133ed9" },
        { id: 5, name: "Валентиныч (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf966eab539ea85d133ee8" },
        { id: 6, name: "Ильич и Эрик (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf9678ab539ea85d133ee9" },
        { id: 7, name: "Топ-репетитор (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf9680ab539ea85d133eea" },
        { id: 8, name: "Оксана Кудлай (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf9689ab539ea85d133eeb" },
        { id: 9, name: "Маша Птипца (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf968fab539ea85d133eec" },
        { id: 10, name: "Катя Строганова (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf969dab539ea85d133eed" },
        { id: 11, name: "Саня Эбонит (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf97a1ab539ea85d133eee" },
        { id: 12, name: "Артем Флеш (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf97a9ab539ea85d133eef" },
        { id: 13, name: "Мария Коршунова (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf97b4ab539ea85d133ef0" },
        { id: 14, name: "Таня Шибитова (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cf97bcab539ea85d133ef1" },
        { id: 15, name: "SMITUP (Годовой от Эли Смит)", imageUrl: "https://i.imgur.com/xYXnbYi.png", mongoId: "66cf9f62ab539ea85d133f02" },
        { id: 16, name: "SMITUP (Годовой от Оли Вебер)", imageUrl: "https://i.imgur.com/xYXnbYi.png", mongoId: "66cf9f79ab539ea85d133f03" },
        { id: 17, name: "МатемАня (Годовой от 100Б)", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "66cfa16bab539ea85d133f0e" },
        { id: 18, name: "ЕГЭLAND (Годовой от Санчеса)", imageUrl: "https://el-ed.ru/wp-content/themes/egeland/new/logo.svg", mongoId: "66d1baa4ab539ea85d133f3e" },
        { id: 19, name: "ЕГЭLAND (Годовой от Русички)", imageUrl: "https://el-ed.ru/wp-content/themes/egeland/new/logo.svg", mongoId: "66d9bb5eab539ea85d134216" },
        { id: 20, name: "Годовой Курс+ от 100Б", imageUrl: "https://i.imgur.com/Fd57OnH.png", mongoId: "6728057adec2b25ef2c2629f" },
        { id: 21, name: "🐈‍⬛Общество и Котики", imageUrl: "https://i.imgur.com/qGh7mTN.png", mongoId: "6706202e2dee01c344b6d15f" },
        { id: 22, name: "Ксения Напольская (Годовой от 100Б)", imageUrl: "https://i.imgur.com/xYXnbYi.png", mongoId: "" },
    ]);
};
