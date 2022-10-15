
import database from '../connection/connection.js';

async function insertUser(userName,regClass,regNumber,birth,email,password,phone,selectedCourse,period){
  const conn = await database.connect();
  let sql = 'INSERT INTO tbl_user(user_name, registration_class, registration_number, birth, email, sign, cell_phone'

  if(period === 'Manhã'){
    sql += ', am_course) '
  }
  if(period === 'Tarde'){
    sql += ', pm_course)'
  }
  if(period === 'Noite'){
    sql += ', n_course)'
  }

  sql += 'values(?,?,?,?,?,?,?,?);'

  const dataUser = [userName,regClass,regNumber,birth,email,password,phone,selectedCourse];
  const teste = await conn.query(sql, dataUser);
  conn.end();
}

async function findUser(email){
  const conn = await database.connect()
  const sql = 'select * from tbl_user where email = ?'
  const dataUser = [email];
  const [rows] = await conn.query(sql, dataUser)
  conn.end()
  return rows
}

async function updateUser(email, password, userName, idUser){
  const conn = await database.connect()
  const sql = 'UPDATE tbl_usuario SET email =?, senha =?, nome_usuario =? WHERE id_usuario =?';
  const dataUser = [email, password, userName, idUser];
  await conn.query(sql, dataUser);
  conn.end()
  return;
}

async function deleteUser(idUser){
    const conn = await database.connect()
    const sql = 'DELETE FROM tbl_usuario WHERE id_usuario =?';
    const dataUser = [idUser];
    await conn.query(sql, dataUser);
    conn.end()
    return; 
    
}

export default {insertUser, findUser, updateUser,deleteUser};

