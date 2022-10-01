import connection from '../db/connection.js';
import { STATUS_CODE } from '../enums/statusCodes.js';
import arrayToObject from '../functions/arrayToObject.js';
import catchError from '../functions/catchError.js';
import getDeltaDays from '../functions/getDeltaDays.js';
import handleParams from '../functions/handleParams.js';

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    const handledParams = handleParams(customerId, gameId);
    const searchBy = handledParams[0];
    const params = handledParams[1];
    const SEARCH_QUERY = `
    SELECT rentals.*, customers.name AS customer, games.name AS game, categories.* FROM rentals
    JOIN customers ON customers.id=rentals."customerId"
    JOIN games ON games.id=rentals."gameId"
    JOIN categories ON categories.id=games."categoryId"
    ${searchBy};`;
    const OBJECT_QUERY = {
      text: SEARCH_QUERY,
      rowMode: 'array',
    };
    const result = await connection.query(OBJECT_QUERY, params);
    res.send(result.rows.map((row) => arrayToObject(row)));
  } catch (error) {
    catchError(res, error);
  }
}

export async function startRent(req, res) {
  const rental = req.body;
  try {
    const SEARCH_QUERY = 'SELECT id FROM customers WHERE id = $1;';
    const customersResult = await connection.query(SEARCH_QUERY, [
      rental.customerId,
    ]);
    if (customersResult.rowCount === 0) {
      return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }
    const SEARCH_QUERY2 = 'SELECT * FROM games WHERE id=$1;';
    const gameResult = await connection.query(SEARCH_QUERY2, [rental.gameId]);
    if (gameResult.rowCount === 0) {
      return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }
    const game = gameResult.rows[0];
    const SEARCH_QUERY3 =
      'SELECT id FROM rentals WHERE "gameId" = $1 AND "returnDate" IS null;';
    const result = await connection.query(SEARCH_QUERY3, [rental.gameId]);
    if (result.rowCount > 0) {
      if (game.stockTotal === result.rowCount) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
      }
    }
    const originalPrice = rental.daysRented * game.pricePerDay;
    const INSERT_QUERY = `
    INSERT INTO rentals (
      "customerId", 
      "gameId", 
      "rentDate", 
      "daysRented", 
      "returnDate", 
      "originalPrice", 
      "delayFee"
    ) VALUES ($1, $2, NOW(), $3, null, $4, null);`;
    const INSERT_ARRAY = [
      rental.customerId,
      rental.gameId,
      rental.daysRented,
      originalPrice,
    ];
    await connection.query(INSERT_QUERY, INSERT_ARRAY);
    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    catchError(res, error);
  }
}

export async function endRent(req, res) {
  const { id } = req.params;
  try {
    const SEARCH_QUERY = 'SELECT * FROM rentals WHERE id = $1';
    const result = await connection.query(SEARCH_QUERY, [id]);
    if (result.rowCount === 0) {
      return res.sendStatus(STATUS_CODE.NOT_FOUND);
    }
    const rental = result.rows[0];
    if (rental.returnDate) {
      return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    } else {
      const deltaDays = getDeltaDays(rental.rentDate);
      let delayFee = 0;
      if (deltaDays > rental.daysRented) {
        const addicionalDays = deltaDays - rental.daysRented;
        delayFee = addicionalDays * rental.originalPrice;
      }
      const UPDATE_QUERY =
        'UPDATE rentals SET "returnDate" = NOW(), "delayFee" = $1 WHERE id = $2';
      await connection.query(UPDATE_QUERY, [delayFee, id]);
      res.sendStatus(STATUS_CODE.OK);
    }
  } catch (error) {
    catchError(res, error);
  }
}

export async function returnRent(req, res) {
  const { id } = req.params;
  try {
    const SEARCH_QUERY = 'SELECT * FROM rentals WHERE id = $1';
    const result = await connection.query(SEARCH_QUERY, [id]);
    if (result.rowCount === 0) {
      res.sendStatus(STATUS_CODE.NOT_FOUND);
    } else {
      const rental = result.rows[0];
      if (!rental.returnDate) {
        res.sendStatus(STATUS_CODE.BAD_REQUEST);
      } else {
        const DELETE_QUERY = 'DELETE FROM rentals WHERE id = $1';
        await connection.query(DELETE_QUERY, [id]);
      }
    }
  } catch (error) {
    catchError(res, error);
  }
}
