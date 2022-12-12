import database from '../connection/connection.js';

async function createNota(analiseGt, nota) {
    const conn = await database.connect()
    let sql = `INSERT INTO notas(analiseGt, nota) values(?,?)`
    const data = [analiseGt, nota]
    const [rows] = await conn.query(sql, data)
    return rows

}

export default{
    createNota
}