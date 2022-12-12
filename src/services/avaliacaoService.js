import database from '../connection/connection.js';

async function createAvaliacao(ano, aluno, modulo, turma, nivelTecnico, orientador, tema, analise, rm, dia, validacao) {
    const conn = await database.connect()
    let sql = `INSERT INTO avaliacao(Ano,aluno,modulo,turma,nivel_tecnico,orientador,tema,analise,rm,dia,validacao ) values(?,?,?,?,?,?,?,?,?,?,?)`
    const data = [ano, aluno, modulo, turma, nivelTecnico, orientador, tema, analise, rm, dia, validacao]
    const [rows] = await conn.query(sql, data)
    return rows

}

async function findAvaliacao() {
    const conn = await database.connect();
    const sql = 'SELECT * FROM avaliacao';
    const [rows] = await conn.query(sql)
    conn.end();
    return rows;
}

export default {
    createAvaliacao,
    findAvaliacao
}

//  Ano,aluno,modulo,turma,nivel_tecnico,orientador,tema,analise,rm,validação
// ( ?,  ?,    ?,      ?,    ?,            ?,         ?,    ?,    ?,   ?,)