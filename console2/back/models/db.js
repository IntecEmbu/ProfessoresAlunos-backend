const Sequelize = require('sequelize');

const sequelize = new Sequelize('bfk85ujgaxhbxyfid15z', 'ukxebu4sm1gjkkna', 'i7scNehFNVVbLuKAsUr5', {
    host: 'bfk85ujgaxhbxyfid15z-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
});

module.exports = sequelize;