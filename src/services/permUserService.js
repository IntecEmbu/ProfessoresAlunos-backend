import database from '../connection/connection.js';

async function findAuth(regClass,regNumber){
  const conn = await database.connect();
  const sql = 'select authority_code, authority_title from tbl_user as u join tbl_perm_user_link as pu join tbl_permission as p on pu.id_user=u.id_user and pu.id_perm=p.id_permission where u.registration_class=? AND u.registration_number=?';
  const dataAuth = [regClass,regNumber];
  const [rows] = await conn.query(sql, dataAuth);
  //console.log(`${sql}`);
  conn.end();
  return rows;
}
export default {findAuth};