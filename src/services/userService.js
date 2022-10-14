import database from '../connections/connection.js'; 

async function insertUser(userName,regNumber,birth,email,password,phone ){
  const conn = await database.connect(); 
  const sql = 'INSERT INTO tbl_user(user_name, registration_number, birth, email, sign, cell_phone ) values(?,?,?,?,?,?);';
  const dataUser = [userName,regNumber,birth,email,password,phone];
  await conn.query(sql, dataUser); 
  conn.end();
}

export default {insertUser};