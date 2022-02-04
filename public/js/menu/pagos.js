
// Add the SDK credentials
const mercadopago = new MercadoPago("PUBLIC KEY", {
  locale: "es-AR",
});

async function renderPago(preference) {
  let html = await fetch("vistas/pagos.html").then(r => r.text());
  
  document.querySelector("main").style.display = "none";
  document.querySelector(".section-pago").innerHTML = html;

  createCheckoutButton(preference.id)

  const items = preference.items
  const refItems = document.querySelector('.items')
  const refITotal = document.querySelector('#summary-total')
  
  let index = items.findIndex(item => item)

  const title = items[index].title
  const price = items[index].unit_price
  const quantity = items[index].quantity 

  let subtotal = price * quantity

  const nTotal =  items.reduce(                  
    (acc, { quantity, unit_price }) => acc + quantity * unit_price,
    0
);
  
  refItems.innerHTML += ` 
    <span class="price" id="summary-price"> Precio: ${subtotal}</span>
    <p class="item-name"> Artículo: ${title} <span class="summary-quantity"> Cantidad: ${quantity}</span></p>
 `
  refITotal.innerHTML = nTotal

  // Go back event, para volver de la pagina de pagos
  document.getElementById("go-back").addEventListener("click", function () {
    document.querySelector("main").style.display = "block";
    document.querySelector(".section-pago").innerHTML = '';
  });
}


function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mercadopago.checkout({
    preference: {
      id: preferenceId
    },
    render: {
      container: '#button-checkout', // Class name where the payment button will be displayed
      label: 'Pagar', // Change the payment button text (optional)
    }
  });
}  