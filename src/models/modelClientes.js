const Sequelize = require('../database/conecte.js');
const { DataTypes } = require('sequelize');


const Clientes = Sequelize.define('Clientes', {

    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    endereco:{
        type:DataTypes.STRING,
        allowNull:false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cidade:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cep:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

module.exports = Clientes;