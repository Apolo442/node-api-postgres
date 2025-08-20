import { sql } from "./dbConnection.js";

sql`
    CREATE TABLE movies (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        genre VARCHAR(100),
        releaseYear INT,
        durationMinutes INT
    );
`.then(() => {
  console.log("Table created");
});

/* 
    FILMES: title, genre, releaseYear, durationMinutes
*/
