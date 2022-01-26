import service from "../service/productos.js"

/* ------------------------- CRUD ----------------------------- */
const getProducts = async (req,res) => {
    let id = req.params.id //requiero el parametro que pase en la url y lo guardo como id
    
    if(id){
        let producto = await service.getOneProduct(id)
        res.json(producto)
    }
    else { 
        let productos = await service.getAllProducts()
        res.json(productos)
    }
}

const saveProducts = async (req,res) => {
    let producto = req.body
    let productoGuardado = await service.saveProduct(producto)
    res.json(productoGuardado)
}

const updateProducts = async (req,res) => {
    let id = req.params.id
    let producto = req.body //me trae la info del body, osea todos los datos que mande en el put, como yo no mando id en el put si no lo creo primero no va a tener id!
    
    let productoActualizado = await service.updateProducts(id,producto)
   //me quita un producto en el indice y luego agrego el actualizado
    res.json(productoActualizado)
}

const deleteProducts = async (req,res) => {
    let id = req.params.id 
    let productoEliminado = await service.deleteProducts(id)
    res.json(productoEliminado)
}
/* ------------------------- CRUD ----------------------------- */

export default {
    saveProducts,
    getProducts,
    updateProducts,
    deleteProducts
}