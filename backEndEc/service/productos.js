const models = require("../models/productos.js")

/* ------------------------- CRUD ----------------------------- */
const saveProduct = producto => {
    let productoGuardado = models.createProduct(producto)
    return productoGuardado
}

const getOneProduct = id => { 
    let producto = models.readProduct(id) 
    return producto
}

const getAllProducts = () => {
    return models.readProducts()
}

const updateProducts = (id,producto) => {
    let productoActualizado = models.updateProduct(id,producto)
    return productoActualizado
}

const deleteProducts = id => {
   let productoEliminado = models.deleteProduct(id)
   return productoEliminado
}
/* ------------------------- CRUD ----------------------------- */

module.exports = {
    saveProduct,
    getOneProduct,
    getAllProducts,
    updateProducts,
    deleteProducts
}