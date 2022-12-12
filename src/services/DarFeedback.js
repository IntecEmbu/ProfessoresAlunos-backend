import database from '../connection/connection.js';

async function createFeeback(nome, email, material, feedback, descricao) {
    const conn = await database.connect();
    const sql = 'INSERT INTO tbl_darfeedback(nome,email,material,feedback,descricao) values (?,?,?,?,?)'
    const dataFeed = [nome, email, material, feedback, descricao]
    const [rows] = await conn.query(sql, dataFeed);
    conn.end();
    return rows
}

async function findAll() {
    const conn = await database.connect();
    const sql = 'SELECT * FROM tbl_darfeedback';
    const [rows] = await conn.query(sql)
    conn.end();
    return rows;
}

async function updateFeed(id_feedback, descricao){
    const conn = await database.connect()
    const sql = 'UPDATE tbl_darfeedback SET  descricao =?  WHERE id_feedback =?';
    const dataGenero = [id_feedback, descricao ];
    await conn.query(sql, dataGenero);
    conn.end()
    return;
  }

export default {
    createFeeback,
    findAll,
    updateFeed
}