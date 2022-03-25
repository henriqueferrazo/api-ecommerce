const express = require('express');
const router = express.Router();


const ClientesControllerRouter = require('../controllers/ClientesController.js')


router.post('/registrar', ClientesControllerRouter.create)

router.get('/', ClientesControllerRouter.showAll)

router.delete('/:id', ClientesControllerRouter.deleteById)


module.exports = router;