class CarritoServices {
  URL_CARRITO = "/api/carrito/";

  async saveCarritoService(carrito) {
    let savedCarrito = await http.post(this.URL_CARRITO, carrito); //hacemos ambas funcions con async , ya que la primera me devuelve una promesa y esta debe esperarla
    return savedCarrito;
  }
}

const carritoService = new CarritoServices();
