import database from '../connection/connection.js';

async function insertDoc(titulo, subtitulo, descricao) {
    const conn = await database.connect(); //responsavel por abrir a conexão com o banco de dados com a api
  
    const sql =
      "INSERT INTO tbl_observatory(obs_name, obs_subject, obs_desc) VALUES(?,?,?);";
    const dataUser = [titulo, subtitulo, descricao];
  
    await conn.query(sql, dataUser); //Nesta linha utilizamos o comando .query para executar a ação dentro do banco de dados. Neça devemos passar a variável referente ao SQL a ser executado e a variavel referente aos dados que serão substituidos no lugar das "?"
  
    conn.end();
  }

async function findObser() {
  const conn = await database.connect();
  const sql = 'SELECT obs_name, obs_subject, obs_desc FROM tbl_observatory ORDER BY id_obs DESC;';
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function insertImage(base64) {
  const conn = await database.connect();
  const sql = 'INSERT INTO tbl_material (image) VALUES (?)';
  const data = [base64];
  const [rows] = await conn.query(sql, data);
  conn.end();
  return rows;
}

export default {
  insertDoc,
  findObser,
  insertImage
};