const Sequelize = require('sequelize');
const db = require('./db');

const Material = db.define('Material', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING
    }
});

//Criar a tabela
Material.sync();

module.exports = Material;