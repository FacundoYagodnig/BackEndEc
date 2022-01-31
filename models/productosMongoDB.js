import mongoose  from 'mongoose'
import DB_Mongo from './DB_Mongo.js'

/* ------------------------- Esquema del ODM -------------------------------------------------------- */
const productoSchema = mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    brand: String,
    category: String,
    photo: String,
    details: String,
    send: Boolean,
    cantidad: Number,
    total : Number
})
/* ------------------------- Esquema del ODM -------------------------------------------------------- */

/* ------------------------- Modelo del doc almacenado en una coleccion ----------------------------- */
const ProductoModel = mongoose.model('productos', productoSchema) //crea la collection
/* ------------------------- Modelo del doc almacenado en una coleccion ----------------------------- */

class ProductoModelMongoDB {

    /* ------------------------------------------ CRUD -------------------------------------------------- */
    /* C => Create */
    createProduct = async producto => {
        if(!DB_Mongo.connectionOk) return {}

        try{
            const saveProduct = new ProductoModel(producto) //esto es para los que entraron por el back
            await saveProduct.save() //metodo que me permite guardar el producto en la base de datos

            let productos = await ProductoModel.find({})      //busco todos, esto es para los que entraron por el front
            let savedProduct = productos[productos.length-1]  //guardo el ultimo

            return DB_Mongo.genIdKey(savedProduct)
        }
        catch(error){
            console.log(`Eror en el createProduct: ${error.message}`)
            return {}
        }
    }
    /* R => Read All */
    readProducts = async () => {
        if(!DB_mongo.connectionOk) return []
        try{
            let productos = await ProductoModel.find({}) //busca todos
            return DB_Mongo.genIdKey(productos)
        }
        catch(error){
            console.log(`Eror en el readProducts: ${error.message}`)
            return []
        }
    }
    /* R => Read One*/
    readProduct = async id => {
        if(!DB_mongo.connectionOk) return {}

        try{
            let producto = await ProductoModel.findOne({_id:id}) //busca 1 por id
            return DB_Mongo.genIdKey(producto)
        }
        catch(error){
            console.log(`Error en el readProduct: ${error.message}`)
            return {}
        }
        
    }
    /* U => Update */
    updateProduct = async (id,producto) => {
        if(!DB_mongo.connectionOk) return {}
        
        try{
            await ProductoModel.updateOne({_id:id}, {$set: producto}) //actualiza 1 por id, mediante el set le pasamos el producto

            let updatedProduct = await ProductoModel.findOne({_id:id})  //busco el producto por el id que entro del front, y lo retorno
            return DB_Mongo.genIdKey(updatedProduct)
        }
        catch(error){
            console.log(`Error en el updateProduct: ${error.message}`)
            return {}
        }
        
    }
    /* D => Delete */
    deleteProduct = async id => {
        if(!DB_mongo.connectionOk) return {}
        try{
            let deletedProduct = await ProductoModel.findOne({_id:id}) 
            await ProductoModel.deleteOne({_id:id})
            
            return DB_Mongo.genIdKey(deletedProduct)
            
        }
        catch(error){
            console.log(`Error en el deleteProduct: ${error.message}`)
            return {}
        }
        
    }
}/* ------------------------- CRUD ----------------------------- */

export default ProductoModelMongoDB
