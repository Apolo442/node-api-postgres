import { randomUUID } from "node:crypto";
import { sql } from "./dbConnection.js";

export class DatabasePostgres {
  async get(search) {
    let itens;

    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        search
      );

    if (search) {
      if (isUUID) {
        itens = await sql`
            SELECT * FROM movies WHERE id = ${search}`;
      } else {
        itens = await sql`
            SELECT * FROM movies WHERE title ilike ${"%" + search + "%"}`;
      }
    } else {
      itens = await sql`SELECT * FROM movies`;
    }
    return itens;
  }
  async post(item) {
    const itemId = randomUUID();

    const { title, genre, releaseYear, durationMinutes } = item;

    await sql`
    INSERT INTO movies 
    (id, title, genre, releaseYear, durationMinutes) VALUES 
    (${itemId}, ${title}, ${genre}, ${releaseYear}, ${durationMinutes})`;
  }
  async put(id, item) {
    const { title, genre, releaseYear, durationMinutes } = item;

    await sql`UPDATE movies SET
     title = ${title},
     genre = ${genre},
     releaseYear = ${releaseYear},
     durationMinutes = ${durationMinutes}
     WHERE id = ${id}`;
  }
  async delete(id) {
    await sql`DELETE FROM movies WHERE id = ${id}`;
  }
}
