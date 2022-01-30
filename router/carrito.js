import express from 'express'
import controller from '../controller/carrito.js'
const router = express.Router()

/* ------------------------- CRUD ----------------------------- */
router.post('/', controller.saveCarritos) 

/* ------------------------- CRUD ----------------------------- */

export default router