const { Sequelize } = require('sequelize');
require('dotenv-safe/config.js')

const sequelize = new Sequelize(process.env.DB_URL)

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