const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });

async function connect() {
    try{
        await sequelize.authenticate()
        console.log('Conectou com o banco') 
    } catch (error) {
        console.log('Deu ruim no banco', error)
    }
}

connect()

module.exports = sequelize;