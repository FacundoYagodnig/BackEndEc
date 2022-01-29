import config from '../config.js'

import CarritoModel from "../models/carrito-factory.js"

const models = CarritoModel.get(config.TIPO_DE_PERSISTENCIA)

/* ------------------------- CRUD ----------------------------- */

const saveCarrito = async carrito => {
    let carritoGuardado = await models.createCarrito(carrito)
    return carritoGuardado
}

/* ------------------------- CRUD ----------------------------- */

export default {saveCarrito}
 
