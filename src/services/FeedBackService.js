import database from '../connection/connection.js';

async function insertAula(material, assunto){
  const conn = await database.connect(); 
  const sql = 'insert into tbl_matAula(material, assunto) values(?,?);';
  const dataAula = [material,assunto];

  await conn.query(sql, dataAula); 
  conn.end();
}

async function findAula(){
  const conn = await database.connect();
  const sql = 'SELECT * FROM tbl_matAula';
  const [rows] = await conn.query(sql)
  conn.end();
  return rows;
}

async function updateAula(id_material, material, assunto){
  const conn = await database.connect()
  const sql = 'UPDATE tbl_matAula SET  material =? and assunto = ? WHERE id_material =?';
  const dataAula = [material, assunto, id_material ];
  await conn.query(sql, dataAula);
  conn.end()
  return;
}

async function deleteAula(id_material){
    const conn = await database.connect()
    const sql = 'DELETE FROM tbl_matAula WHERE id_material =?';
    await conn.query(sql, id_material);
    conn.end()
    return; 
    
}
export default {insertAula, findAula, updateAula, deleteAula};
