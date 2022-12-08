import database from '../connection/connection.js';

async function insertDoc(titulo, subtitulo, descricao, criador) {
    const conn = await database.connect(); //responsavel por abrir a conexão com o banco de dados com a api
  
    const sql =
      "INSERT INTO tbl_observatory(obs_name, obs_subject, obs_desc, criador) VALUES(?,?,?,?);";
    const dataUser = [titulo, subtitulo, descricao, criador];
  
    await conn.query(sql, dataUser); //Nesta linha utilizamos o comando .query para executar a ação dentro do banco de dados. Neça devemos passar a variável referente ao SQL a ser executado e a variavel referente aos dados que serão substituidos no lugar das "?"
  
    conn.end();
  }

  async function findObser() {
    const conn = await database.connect();
    const sql = 'SELECT obs_name, obs_subject, obs_desc, criador FROM tbl_observatory';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
  }
  // async function insertImage(encoded) {
  //   const conn = await database.connect(); 
  
  //   const sql =
  //     "INSERT INTO tbl_material(digital_repository) VALUES(?);";
  //   const image = encoded
  //   await conn.query(sql, image); 
  //   conn.end();
  // }

export default {insertDoc, findObser};