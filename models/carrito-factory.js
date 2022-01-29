import CarritoModelMongoDB from "./carritoMongoDB.js"

class CarritoModel {
    static get(tipo){
        switch(tipo){
            // case 'MEM':
            //     console.log('**** PERSISTENCIA EN MEMORIA ****')
            //     return new CarritoModelMem()
            // case 'FILE':
            //     console.log('**** PERSISTENCIA EN FS ****')
            //     return new CarritoModelFile
            case 'MONGODB':
                console.log('**** PERSISTENCIA EN MONGODB (carrito) ****')
                return new CarritoModelMongoDB()
            case 'DEFAULT':
                console.log('**** PERSISTENCIA DEFAULT (carrito) ****')
                return new CarritoModelMongoDB()
                
        }
    }
}

export default CarritoModel