import connection from '../db/connection.js';
import catchError from '../functions/catchError.js';

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    const params = [];
    let searchBy = '';
    if (cpf) {
      params.push(`${cpf}%`);
      searchBy += `WHERE cpf ILIKE $${params.length}`;
    }
    const SEARCH_QUERY = `SELECT * FROM customers ${searchBy} ORDER BY id ASC`;
    const { rows: customers } = await connection.query(SEARCH_QUERY, params);
    res.send(customers);
  } catch (error) {
    catchError(res, error);
  }
}

export async function getSpecificCustomer(req, res) {
  const { id } = req.params;
  if (!Number(id)) {
    return res.sendStatus(400);
  }
  try {
    const SEARCH_QUERY = `SELECT * FROM customers WHERE id = $1`;
    const { rows: customer, rowCount } = await connection.query(SEARCH_QUERY, [
      id,
    ]);
    if (rowCount === 0 || rowCount > 1) {
      return res.sendStatus(404);
    }
    res.send(customer[0]);
  } catch (error) {
    catchError(res, error);
  }
}

export async function createCustomer(req, res) {
  const newCustomer = req.body;

  try {
    const SEARCH_QUERY = `SELECT * FROM customers WHERE cpf=$1`;
    const SEARCH_CUSTOMER = await connection.query(SEARCH_QUERY, [
      newCustomer.cpf,
    ]);
    if (SEARCH_CUSTOMER.rowCount > 0) {
      return res.sendStatus(409);
    }
    const INSERT_QUERY = `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`;
    await connection.query(INSERT_QUERY, [
      newCustomer.name,
      newCustomer.phone,
      newCustomer.cpf,
      newCustomer.birthday,
    ]);

    res.sendStatus(201);
  } catch (error) {
    catchError(res, error);
  }
}

export async function updateCustomer(req, res) {
  const { id } = req.params;
  const customer = req.body;

  try {
    const SEARCH_QUERY = `SELECT * FROM customers WHERE cpf = $1 AND id <> $2`;
    const SEARCH_CUSTOMER = await connection.query(SEARCH_QUERY, [
      customer.cpf,
      id,
    ]);

    if (SEARCH_CUSTOMER.rowCount > 0) {
      return res.sendStatus(409);
    }

    const UPDATE_QUERY = `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`;

    await connection.query(UPDATE_QUERY, [
      customer.name,
      customer.phone,
      customer.cpf,
      customer.birthday,
      id,
    ]);

    res.sendStatus(200);
  } catch (error) {
    catchError(res, error);
  }
}
