import database from '../connection/connection.js'; 

async function createFeeback(nome,email,material,feedback,descricao){
    const conn = await database.connect();
    const sql = 'INSERT INTO tbl_darfeedback(nome,email,material,feedback,descricao) values (?,?,?,?,?)'
    const dataFeed = [nome,email,material,feedback,descricao]
    const [rows] = await conn.query(sql, dataFeed); 
    conn.end();
    return rows
}
export default{
    createFeeback
}