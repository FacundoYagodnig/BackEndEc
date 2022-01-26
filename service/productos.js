// import models from "../models/productosMem.js"
import models from "../models/productosFile.js"

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
    let productoGuardado = await models.createProduct(producto)
    return productoGuardado
}

const updateProducts = async (id,producto) => {
    let productoActualizado = await models.updateProduct(id,producto)
    return productoActualizado
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