const Sequelize = require('sequelize');
const db = require('./db');

const Image = db.define('Images', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    image: {
        type: Sequelize.STRING(60)
    }
});

//Criar a tabela
Image.sync();

module.exports = Image;