import sequelize from 'sequelize';

//banco usuario senha
const dbsequelize = new sequelize('bfk85ujgaxhbxyfid15z', 'ukxebu4sm1gjkkna', 'i7scNehFNVVbLuKAsUr5', {
    host: 'bfk85ujgaxhbxyfid15z-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

dbsequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

export default  dbsequelize;



