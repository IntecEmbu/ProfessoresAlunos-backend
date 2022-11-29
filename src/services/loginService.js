import database from "../connection/connection.js";

async function login(nome, senha) {
  const conn = await database.connect();
  const sql =
    "select user_name, sign from tbl_user WHERE user_name = ? AND sign = ?;";
  const dataLogin = [nome, senha];

  const [rows] = await conn.query(sql, dataLogin);

  conn.end();

  return rows;
}

async function namePersol() {
  const conn = await database.connect();
  const sql = 'SELECT user_name, registration_number FROM tbl_user WHERE id_user = 6';
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

export default { login, namePersol };