import express from 'express'
import controller from '../controller/productos.js'
const router = express.Router()

/* ------------------------- CRUD ----------------------------- */
router.post('/', controller.saveProducts) 
router.get('/:id?', controller.getProducts)
router.put('/:id', controller.updateProducts)
router.delete('/:id', controller.deleteProducts)
/* ------------------------- CRUD ----------------------------- */

export default router