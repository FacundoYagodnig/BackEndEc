import mongoose  from "mongoose"
import DB_Mongo from './DB_Mongo.js'

/* ------------------------- Esquema del ODM -------------------------------------------------------- */
const carritoSchema = mongoose.Schema({
    carrito: Array
})
/* ------------------------- Esquema del ODM -------------------------------------------------------- */

/* ------------------------- Modelo del doc almacenado en una coleccion ----------------------------- */
const CarritoModel = mongoose.model('carritos', carritoSchema) //crea la collection
/* ------------------------- Modelo del doc almacenado en una coleccion ----------------------------- */
class CarritoModelMongoDB {
    
    /* ------------------------------------------ CRUD -------------------------------------------------- */
    /* C => Create */
    createCarrito = async (carrito) => {
        if(!DB_Mongo.connectionOk) return {}

        try{
            const saveCarrito = new CarritoModel({carrito: carrito}) //esto es para los que entraron por el back
            await saveCarrito.save() //metodo que me permite guardar el carrito en la base de datos
            return carrito
        }
        catch(error){
            console.log(`Error en el createCarrito: ${error.message}`)
            return {}
        }
    }
   
}/* ------------------------- CRUD ----------------------------- */

export default CarritoModelMongoDB
