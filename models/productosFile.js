import fs from 'fs'
class ProductoModelFile { 
    nombreArchivo = 'productos.dat'

    leerArchivoProducto = async () => {
        try {
            let productos = await JSON.parse(await fs.promises.readFile(this.nombreArchivo,'utf-8'))
            return productos
        } 
        catch(error){
            let productos = []
            return productos
        }
    }

    guardarArchivoProducto = async productos => {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null,'\t'))
    }

    getId = productos => {
        return productos.length? (productos[productos.length - 1].id + 1) : 1 //productos[numero-1].id  + 1 
    }

    /* ------------------------- CRUD ----------------------------- */
    /* C => Create */
    createProduct = async producto => {
        let productos = await this.leerArchivoProducto() //leemos

        producto.id =  this.getId(productos)  //modificamos
        productos.push(producto)

        await guardarArchivoProducto(productos)//guardamos
        return producto
    }
    /* R => Read All */
    readProducts = async () => {
        let productos = await this.leerArchivoProducto() 
        return productos
    }
    /* R => Read One*/
    readProduct = async id => {
        let productos = await this.leerArchivoProducto()

        let producto = productos.find(producto => producto.id == id) || {} 
        return producto
    }
    /* U => Update */
    updateProduct = async (id,producto) => {
        let productos = await this.leerArchivoProducto()

        producto.id = id
        let index = productos.findIndex(producto => producto.id == id)
        productos.splice(index,1,producto)

        await guardarArchivoProducto(productos)
        return producto
    }
    /* D => Delete */
    deleteProduct = async id => {
        let productos = await this.leerArchivoProducto()

        let index = productos.findIndex(producto => producto.id == id)
        let producto = productos.splice(index,1)[0] 

        await guardarArchivoProducto(productos)
        return producto
    }
}
/* ------------------------- CRUD ----------------------------- */

export default ProductoModelFile