import connection from '../db/connection.js';
import catchError from '../functions/catchError.js';
import { STATUS_CODE } from '../enums/statusCodes.js';

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(
      'SELECT * FROM categories;'
    );
    res.send(categories);
  } catch (error) {
    catchError(res, error);
  }
}

export async function createCategory(req, res) {
  try {
    const newCategory = req.body;
    const statusExists = await connection.query(
      'SELECT * FROM categories WHERE name = $1;',
      [newCategory.name]
    );
    if (statusExists.rowCount > 0) {
      return res.sendStatus(STATUS_CODE.CONFLICT);
    }
    await connection.query('INSERT INTO categories (name) VALUES ($1);', [
      newCategory.name,
    ]);

    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    catchError(res, error);
  }
}
