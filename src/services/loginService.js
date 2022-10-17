import database from '../connection/connection.js'

async function login(userName, sign){
  const conn = await database.connect();
  const sql = 'select * from tbl_user WHERE user_name = ? AND sign = ?;';
  const dataLogin = [userName,sign];

  const [rows] = await conn.query(sql,dataLogin)

  conn.end()

  return rows
}

export default {login}