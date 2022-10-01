import connection from '../db/connection.js';
import catchError from '../functions/catchError.js';

export async function getGames(req, res) {
  const { name } = req.query;
  try {
    const params = [];
    let searchBy = '';
    if (name) {
      params.push(`${name}%`);
      searchBy += `WHERE games.name ILIKE $${params.length}`;
    }
    const SEARCH_QUERY = `
    SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON categories.id=games."categoryId"${searchBy};
  `;
    const result = await connection.query(SEARCH_QUERY, params);
    res.send(result.rows);
  } catch (error) {
    catchError(res, error);
  }
}

export async function createGame(req, res) {
  try {
    const newGame = req.body;

    const searchGameId = await connection.query(
      'SELECT * FROM categories WHERE id = $1;',
      [newGame.categoryId]
    );
    if (searchGameId.rowCount === 0) {
      return res.sendStatus(400);
    }

    const searchGameName = await connection.query(
      'SELECT * FROM games WHERE name = $1;',
      [newGame.name]
    );

    if (searchGameName.rowCount > 0) {
      return res.sendStatus(409);
    }

    const INSERT_QUERY =
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5) ';
    await connection.query(INSERT_QUERY, [
      newGame.name,
      newGame.image,
      Number(newGame.stockTotal),
      newGame.categoryId,
      Number(newGame.pricePerDay),
    ]);

    res.sendStatus(201);
  } catch (error) {
    catchError(res, error);
  }
}
