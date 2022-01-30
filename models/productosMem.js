class ProductoModelMem {
    productos = []
    idProducto = 0

    /* ------------------------- CRUD ----------------------------- */
    /* C => Create */
    createProduct = async producto => {
        producto.id = ++this.idProducto
        this.productos.push(producto)
        return producto
    }
    /* R => Read All */
    readProducts = async () => {
        return this.productos
    }
    /* R => Read One*/
    readProduct = async id => {
        let producto = this.productos.find(producto => producto.id == id) || {} 
        return producto
    }
    /* U => Update */
    updateProduct = async (id,producto) => {
        producto.id = id
        let index = this.productos.findIndex(producto => producto.id == id)
        this.productos.splice(index,1,producto)
        return producto
    }
    /* D => Delete */
    deleteProduct = async id => {
        let index = this.productos.findIndex(producto => producto.id == id)
        let producto = this.productos.splice(index,1)[0] 
        return producto
    }
}/* ------------------------- CRUD ----------------------------- */

export default ProductoModelMem
