import database from '../connection/connection.js';

async function createCourse(nomedoCurso, acronimo, periodo){
  const conn = await database.connect()
  let sql = `INSERT INTO tbl_course(course_name, course_acronym, period) values(?,?,?)`
  const data = [nomedoCurso,acronimo,periodo]
  const [rows] = await conn.query(sql, data)
  return rows
  
}
async function consultar(nomedoCurso, periodo) {
  const conn = await database.connect();
  const sql =
    "select course_name, course_acronym, period from tbl_course WHERE course_name = ? AND period = ?;";
  const dataC = [nomedoCurso, periodo];

  const [rows] = await conn.query(sql, dataC);

  conn.end();

  return rows;
}

export default {
  createCourse, consultar
}