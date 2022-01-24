const service = require("../service/productos.js")

/* ------------------------- CRUD ----------------------------- */
const saveProducts = (req,res) => {
    let producto = req.body
    let productoGuardado = service.saveProduct(producto)
    res.json(productoGuardado)
}

const getProducts = (req,res) => {
    let id = req.params.id //requiero el parametro que pase en la url y lo guardo como id
    if(id){
        let producto = service.getOneProduct(id)
        res.json(producto)
    }
    else { 
        let productos = service.getAllProducts()
        res.json(productos)
    }
}

const updateProducts = (req,res) => {
    let id = req.params.id
    let producto = req.body //me trae la info del body, osea todos los datos que mande en el put, como yo no mando id en el put si no lo creo primero no va a tener id!
    
    let productoActualizado = service.updateProducts(id,producto)
   //me quita un producto en el indice y luego agrego el actualizado
    res.json(productoActualizado)
}

const deleteProducts = (req,res) => {
    let id = req.params.id 
    let productoEliminado = service.deleteProducts(id)
    res.json(productoEliminado)
}
/* ------------------------- CRUD ----------------------------- */

module.exports = {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
}