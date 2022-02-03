import express from 'express'
import controller from '../controller/carrito.js'
import pagos from '../controller/pagos.js'

const router = express.Router()

/* ------------------------- CRUD ----------------------------- */
router.post('/', controller.saveCarritos) 

router.get('/feedback', pagos.feedBack)
/* ------------------------- CRUD ----------------------------- */

export default router