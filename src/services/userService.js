import database from '../connection/connection.js';

async function findUserName(regClass,regNumber){	//Retorna o nome de um usuário cadastrado utilizando parâmetros Classe e número de registro.
  const conn = await database.connect();
  const sql = 'select user_name from tbl_user where registration_class=? AND registration_number=?';
  const dataUser = [regClass,regNumber];
  const [rows] = await conn.query(sql, dataUser);
  //console.log(`${sql}`);
  conn.end();
  return rows;
}

export default {findUserName};