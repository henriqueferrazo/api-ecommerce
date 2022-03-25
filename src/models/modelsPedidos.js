const Sequelize = require('../database/conecte.js');
const { DataTypes } = require('sequelize');
const Produtos = require('./modelProdutos.js');
const Clientes = require('./modelClientes.js')

const Pedidos = Sequelize.define('Pedidos', {
    data:{
        type:DataTypes.STRING,
        allowNull:false
    }


})

Pedidos.belongsTo(Produtos,{foreignKey:"id_Produtos"});
Pedidos.belongsTo(Clientes, {foreignKey:"id_Clientes"});

module.exports = Pedidos;