const express = require('express');
const router = express.Router();


const ProdutosControllerRouter = require('../controllers/ProdutosContronller.js')


router.post('/registrar', ProdutosControllerRouter.create)

router.get('/', ProdutosControllerRouter.showAll)

router.delete('/:id', ProdutosControllerRouter.deleteById)


module.exports = router;