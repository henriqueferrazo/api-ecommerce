const express = require('express');
const router = express.Router();


const PedidosControllerRouters = require('../controllers/pedidosController.js')


router.post('/registrar', PedidosControllerRouters.create)

router.get('/', PedidosControllerRouters.showAll)

router.get('/:id', PedidosControllerRouters.showById)

router.delete('/:id', PedidosControllerRouters.deleteById)


module.exports = router;