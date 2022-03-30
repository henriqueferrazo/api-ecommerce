const express = require('express');
const Sequelize = require('./src/database/conecte.js');
const { Produtos } = require('./src/models/modelProdutos.js');
const { Clientes } = require('./src/models/modelClientes.js');
const { Pedidos } = require('./src/models/modelsPedidos.js');
const app = express();
const port = process.env.PORT || 3001;
const clientesRouters = require('./src/router/ClientesRouters.js');
const produtosRouters = require('./src/router/ProdutosRouters.js');
const pedidosRouters = require('./src/router/PedidosRouters.js');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/clientes', clientesRouters);
app.use('/produtos', produtosRouters);
app.use('/pedidos', pedidosRouters);

app.get('/', (req, res) => {
    res.status(200).json(Produtos)
})

app.get('/', (req, res) => {
    res.status(200).json(Clientes)
})

app.get('/', (req, res) => {
    res.status(200).json(Pedidos)
})

async function sicronizar(){
try{
    await Sequelize.sync()
    app.listen(port, () => console.log("Backend On"))
}catch(error){
    console.log(`erro ao conectar o ${error}`);
}
}

sicronizar()

