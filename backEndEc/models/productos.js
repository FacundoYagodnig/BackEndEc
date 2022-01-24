const productos = []
let idProducto = 0

/* ------------------------- CRUD ----------------------------- */
/* C => Create */
const createProduct = producto => {
    producto.id = ++idProducto
    productos.push(producto)
    return producto
}
/* R => Read All */
const readProducts = () => {
    return productos
}
/* R => Read One*/
const readProduct = id => {
    let producto = productos.find(producto => producto.id == id) || {} 
    return producto
}
/* U => Update */
const updateProduct = (id,producto) => {
    producto.id = id
    let index = productos.findIndex(producto => producto.id == id)
    productos.splice(index,1,producto)
    return producto
}
/* D => Delete */
const deleteProduct = id => {
    let index = productos.findIndex(producto => producto.id == id)
    let producto = productos.splice(index,1)[0] 
    return producto
}
/* ------------------------- CRUD ----------------------------- */

module.exports = {
    createProduct,
    readProduct,
    readProducts,
    updateProduct,
    deleteProduct
}
