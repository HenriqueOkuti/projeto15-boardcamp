import connection from '../db/connection.js';
import catchError from '../functions/catchError.js';
import { STATUS_CODE } from '../enums/statusCodes.js';

export async function getCategories(req, res) {
  try {
    const SEARCH_QUERY = 'SELECT * FROM categories;';
    const { rows: categories } = await connection.query(SEARCH_QUERY);
    res.send(categories);
  } catch (error) {
    catchError(res, error);
  }
}

export async function createCategory(req, res) {
  try {
    const newCategory = req.body;
    const SEARCH_QUERY = 'SELECT * FROM categories WHERE name = $1;';
    const statusExists = await connection.query(SEARCH_QUERY, [
      newCategory.name,
    ]);
    if (statusExists.rowCount > 0) {
      return res.sendStatus(STATUS_CODE.CONFLICT);
    }
    const INSERT_QUERY = 'INSERT INTO categories (name) VALUES ($1);';
    await connection.query(INSERT_QUERY, [newCategory.name]);
    res.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    catchError(res, error);
  }
}
