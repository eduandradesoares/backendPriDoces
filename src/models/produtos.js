const Sequelize = require('sequelize');
const sequelize = require('../database/db.js');

const Produto = sequelize.define("produto", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3,100]
        }
    },
    valor: {
        allowNull: false,
        type: Sequelize.DOUBLE,
        validate: {
            len: [1,99999]
        }
    },
    dataFabricacao: {
        allowNull: false,
        type: Sequelize.DATE()
    },
    dataValidade: {
        allowNull: false,
        type: Sequelize.DATE()
    }
    
});

module.exports = Produto;
