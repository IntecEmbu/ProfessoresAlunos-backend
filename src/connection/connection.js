//importando a funcionalidade do mysql2 para usar promisses
import mysql from 'mysql2/promise';

//realiza a conexão com o banco
async function connect() {
  const connection = await mysql.createConnection({
    host: 'bfk85ujgaxhbxyfid15z-mysql.services.clever-cloud.com',
    user:  'ukxebu4sm1gjkkna',
    password: 'i7scNehFNVVbLuKAsUr5',
    database: 'bfk85ujgaxhbxyfid15z'
  });

  return connection;
}

export default {connect};
