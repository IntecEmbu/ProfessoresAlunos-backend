import database from "../connection/connection.js";

async function login(user_name, senha, registro_classe, registro_numero) {
  const conn = await database.connect();
  const sql = "select * from tbl_user WHERE user_name = ? AND sign = ? AND registration_class = ? AND registration_number = ?;";
  const dataLogin = [user_name, senha, registro_classe, registro_numero];

  const [rows] = await conn.query(sql, dataLogin);

  conn.end();

  return rows;
}

async function namePersol() {
  const conn = await database.connect();
  const sql = 'SELECT user_name FROM tbl_user';
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

export default { login,namePersol};