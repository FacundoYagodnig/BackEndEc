import config from '../config.js'

import ProductoModel from "../models/productos-factory.js"
import ProductoValidation from '../models/validaciones/productos.js'

const models = ProductoModel.get(config.TIPO_DE_PERSISTENCIA_PRODUCTOS)

/* ------------------------- CRUD ----------------------------- */

const getAllProducts = async () => {
    let productos = await models.readProducts()
    return productos
}

const getOneProduct = async id => { 
    let producto = await models.readProduct(id) 
    return producto
}

const saveProduct = async producto => {
    const errorValidation = ProductoValidation.validar(producto)

    if(!errorValidation) {
        let productoGuardado = await models.createProduct(producto)
        return productoGuardado
    }  else {
        throw new Error('Error en saveProduct', errorValidation.details[0].message)
    }
    
}

const updateProducts = async (id,producto) => {
    const errorValidation = ProductoValidation.validar(producto)
    if(!errorValidation) {
    let productoActualizado = await models.updateProduct(id,producto)
    return productoActualizado
    }
    else {
       console.error('Error en updateProducts', errorValidation.details[0].message)
    }
}

const deleteProducts = async id => {
   let productoEliminado = await models.deleteProduct(id)
   return productoEliminado
}
/* ------------------------- CRUD ----------------------------- */

export default  {
    saveProduct,
    getOneProduct,
    getAllProducts,
    updateProducts,
    deleteProducts
}