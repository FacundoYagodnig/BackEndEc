import express from 'express'
import routerProductos from './router/productos.js'
import routerCarrito from './router/carrito.js'
import config from './config.js'

import DB_Mongo from './models/DB_Mongo.js'

DB_Mongo.conectarDB()

const app = express()

//middlewares config de datos que se utilizan
app.use(express.static('public'))               //reemplaza al app.get ruta en cada caso y utiliza la ruta de public
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


const PORT = process.env.PORT || config.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchado en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))