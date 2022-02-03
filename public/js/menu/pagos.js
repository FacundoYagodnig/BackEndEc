
// Add the SDK credentials
const mercadopago = new MercadoPago("CLAVE PUBLICA MERCADO PAGO", {
  locale: "es-AR",
});

async function renderPago(preference) {
  let html = await fetch("vistas/pagos.html").then(r => r.text());
  
  document.querySelector("main").style.display = "none";
  document.querySelector(".section-pago").innerHTML = html;

  createCheckoutButton(preference.id)

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