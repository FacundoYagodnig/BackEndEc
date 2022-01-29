import service from "../service/carrito.js"


const saveCarritos = async (req,res) => {
    let carrito = req.body
    let carritoGuardado = await service.saveCarrito(carrito)
    res.json(carritoGuardado)
}


export default {saveCarritos}