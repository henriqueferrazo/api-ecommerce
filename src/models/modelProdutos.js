const Sequelize = require('../database/conecte.js');
const { DataTypes } = require('sequelize')


const Produtos = Sequelize.define('Produtos', {
    imagem:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nome:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    descricao:{
        type:DataTypes.STRING,
        allowNull:false
    },
    preco:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Produtos;