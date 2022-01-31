import mongoose from "mongoose"
import config from '../config.js'

class DB_Mongo{
    static connectionOk = false
    static pk = '_id' //id = _id

    static genIdKey(obj){                           

        if(Array.isArray(obj)){                     //si el obj es un array, lo recorro e igualo el id al pk
            for(let i = 0; i < obj.length; i++){
                obj[i].id = obj[i][DB_Mongo.pk]
            }
        }
        else {
            obj.id = obj[DB_Mongo.pk] //si no es un array, simplemente el id = pk
        }
        return obj                   //por ultimo retorno el obj ya con el id modificado
    }
     
    static async conectarDB(){
        try{
            if(!DB_Mongo.connectionOk){  // si no esta conectada, conectala, sino no hagas nada
            await mongoose.connect(config.STR_CNX, { 
                useNewUrlParser: true,   
                useUnifiedTopology: true
            })
        }
            console.log('Base de datos conectada')
            DB_Mongo.connectionOk = true
        }
        catch(error){
            console.log(`MongoDB error al conectar: ${error.message}`)
        }
    }

}

export default DB_Mongo