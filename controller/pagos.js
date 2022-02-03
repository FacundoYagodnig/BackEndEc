// Mercado Pago SDK
import mercadopago from 'mercadopago'

// Add Your credentials
mercadopago.configure({
  access_token: 'CLAVE PRIVADA MERCADO PAGO'
});


console.log('------ configuracion de SDK de mercado pago ------')

const feedBack = (req, res) => {
  let infoPago = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	}
    console.log(infoPago)

    res.redirect('/')
}

export default {feedBack} 