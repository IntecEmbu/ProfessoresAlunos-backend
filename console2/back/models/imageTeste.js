const Sequelize = require('sequelize');
const db = require('./db');

const tbl_material = db.define('tbl_material', {
    id_material: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    digital_repository: {
        type: Sequelize.STRING(300)
    }
});

//Criar a tabela
tbl_material.sync();

module.exports = tbl_material;