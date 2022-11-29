
import database from '../connection/connection.js'; 

async function findAll (scheduleName){
  const conn = await database.connect(); 
  let sql = `SELECT * FROM tbl_course WHERE period = (SELECT id_scd FROM tbl_course_schedule WHERE scd_name = ?);`

  const data = [scheduleName];
  const [rows] = await conn.query(sql, data); 
  conn.end();
  return rows
}


export default {
    findAll
};
