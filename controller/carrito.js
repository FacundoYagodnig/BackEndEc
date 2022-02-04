import service from "../service/carrito.js"
import mercadopago from 'mercadopago'


const saveCarritos = async (req,res) => {
    let carrito = req.body
    let carritoGuardado = await service.saveCarrito(carrito) //carritoGuardado es un array

    let items = []                             //seteo el modelo de array de los items

    for (let item of carritoGuardado) {       //pusheo cada item en carritoGuardado , con las propiedades que me interesan
        items.push( 
            {
            title: item.name,
            unit_price: Number(item.price),
            quantity: Number(item.cantidad),
        })
    }

    let preference = {
		items: items,               //los inyecto de manera individual en las preferences
		back_urls: {
			"success": "https:/localhost::8080/api/carrito/feedback",  //y en la ruta correspondiente
			"failure": "https:/localhost::8080/api/carrito/feedback",
			"pending": "https:/localhost::8080/api/carrito/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference) //crea la vinculacion de las preferencias con el pago
		.then(function (response) {
			res.json({
				id: response.body.id, items    //el cliente recibe el id y los items
			});
		}).catch(function (error) {
			console.log(error);
		});
}


export default {saveCarritos}