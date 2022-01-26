import fs from 'fs'

const nombreArchivo = 'productos.dat'

const leerArchivoProducto = async () => {
    try {
        let productos = await JSON.parse(await fs.promises.readFile(nombreArchivo,'utf-8'))
        return productos
    } 
    catch(error){
let productos = []
return productos
    }
}

const guardarArchivoProducto = async productos => {
  await fs.promises.writeFile(nombreArchivo, JSON.stringify(productos,null,'\t'))
}

const getId = productos => {
    return productos.length? (productos[productos.length - 1].id + 1) : 1 //productos[numero-1].id  + 1 
}

/* ------------------------- CRUD ----------------------------- */
/* C => Create */
const createProduct = async producto => {
    let productos = await leerArchivoProducto() //leemos

    producto.id =  getId(productos)  //modificamos
    productos.push(producto)

    await guardarArchivoProducto(productos)//guardamos
    return producto
}
/* R => Read All */
const readProducts = async () => {
    let productos = await leerArchivoProducto() 
    return productos
}
/* R => Read One*/
const readProduct = async id => {
    let productos = await leerArchivoProducto()

    let producto = productos.find(producto => producto.id == id) || {} 
    return producto
}
/* U => Update */
const updateProduct = async (id,producto) => {
    let productos = await leerArchivoProducto()

    producto.id = id
    let index = productos.findIndex(producto => producto.id == id)
    productos.splice(index,1,producto)

    await guardarArchivoProducto(productos)
    return producto
}
/* D => Delete */
const deleteProduct = async id => {
    let productos = await leerArchivoProducto()

    let index = productos.findIndex(producto => producto.id == id)
    let producto = productos.splice(index,1)[0] 

    await guardarArchivoProducto(productos)
    return producto
}
/* ------------------------- CRUD ----------------------------- */

export default {
    createProduct,
    readProduct,
    readProducts,
    updateProduct,
    deleteProduct
}