const express = require('express') 
const routerProductos = require('./router/productos.js')

const app = express()

//middlewares config de datos que se utilizan
app.use(express.static('public'))               //reemplaza al app.get ruta en cada caso y utiliza la ruta de public
//app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/productos', routerProductos)


const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor express escuchado en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))