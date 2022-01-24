const express = require('express') 
const controller = require('../controller/productos.js')
const router = express.Router()

/* ------------------------- CRUD ----------------------------- */
router.post('/', controller.saveProducts) 
router.get('/:id?', controller.getProducts)
router.put('/:id', controller.updateProducts)
router.delete('/:id', controller.deleteProducts)
/* ------------------------- CRUD ----------------------------- */

module.exports = router