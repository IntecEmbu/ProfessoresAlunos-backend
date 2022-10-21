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

export default { login };