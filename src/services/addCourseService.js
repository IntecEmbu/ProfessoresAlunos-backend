import database from '../connection/connection.js';

async function createCourse(nomedoCurso, acronimo, periodo){
  const conn = await database.connect()
  let sql = `INSERT INTO tbl_course(course_name, course_acronym, period) values(?,?,?)`
  const data = [nomedoCurso,acronimo,periodo]
  const [rows] = await conn.query(sql, data)
  return rows
  
}

export default {
  createCourse
}