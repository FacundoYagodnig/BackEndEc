const URL_PRODUCTS = 'https://61d4ac148df81200178a8df2.mockapi.io/products/' 

async function getProductsService(){
    let products = await get(URL_PRODUCTS) //hacemos ambas funcions con async , ya que la primera me devuelve una promesa y esta debe esperarla
    return products
}

async function saveProductsService(product){
    let savedProducts = await post(URL_PRODUCTS, product )
    return savedProducts
}

async function updateProductsService(id, product){
    let updatedProducts = await put(URL_PRODUCTS, id, product )
    return updatedProducts
}

async function deleteProductsService(id){
    let deletedProducts = await del(URL_PRODUCTS, id )
    return deletedProducts
}
