import { fastify } from "fastify";
import { DatabasePostgres } from "./databasePostgres.js";

const database = new DatabasePostgres();
const server = fastify();
const PORT = 3003;

server.get("/movies", async (req, res) => {
  const search = req.query.search;
  const itens = await database.get(search);
  return itens;
});

server.post("/setmovie", async (req, res) => {
  const { title, genre, releaseYear, durationMinutes } = req.body;

  try {
    await database.post({
      title,
      genre,
      releaseYear,
      durationMinutes,
    });

    res.status(200).send({ message: "Movie successful created" });
  } catch (error) {
    const e = "Error trying to create movie";
    console.log(e);
    res.status(500).send({ error: e });
  }
});

server.put("/editmovie/:id", async (req, res) => {
  const id = req.params.id;
  const { title, genre, releaseYear, durationMinutes } = req.body;

  try {
    await database.put(id, {
      title,
      genre,
      releaseYear,
      durationMinutes,
    });

    res.status(200).send({ message: "Movie successful edited" });
  } catch (error) {
    const e = "Error trying to edit movie";
    console.log(e);
    res.status(500).send({ error: e });
  }
});

server.delete("/deletemovie/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await database.delete(id);
    res.status(200).send({ message: "Movie successful deleted" });
  } catch (error) {
    const e = "Error trying to delete movie";
    console.log(e);
    res.status(500).send({ error: e });
  }
});

server.listen({
  port: PORT,
});
