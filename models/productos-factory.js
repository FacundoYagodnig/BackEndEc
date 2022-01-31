import ProductoModelFile from "./productosFile.js"
import ProductoModelMem from "./productosMem.js"
import ProductoModelMongoDB from "./productosMongoDB.js"

class ProductoModel {
    static get(tipo){
        switch(tipo){
            case 'MEM':
                console.log('**** PERSISTENCIA EN MEMORIA (productos) ****')
                return new ProductoModelMem()
            case 'FILE':
                console.log('**** PERSISTENCIA EN FS (productos) ****')
                return new ProductoModelFile
            case 'MONGODB':
                console.log('**** PERSISTENCIA EN MONGODB (productos) ****')
                return new ProductoModelMongoDB()
            case 'DEFAULT':
                console.log('**** PERSISTENCIA DEFAULT (productos) ****')
                return {}
                
        }
    }
}

export default ProductoModel