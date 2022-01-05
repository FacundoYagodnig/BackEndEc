let productsList = []

async function getProducts(){
    productsList = await getProductsService()
    renderProducts();
}

async function saveProduct(){
   let product =  leerProductoIngresado()
   limpiarFormulario()

   let savedProduct = await saveProductsService(product)
   console.log(savedProduct)

   productsList.push(savedProduct);
   
   renderProducts(); 
}

async function updateProduct(id){
    let product =  leerProductoIngresado()
    limpiarFormulario()
 
    let updateProduct = await updateProductsService(id,product)
    console.log(updateProduct)
 
   let index = productsList.findIndex((product => product.id == updateProduct.id))
   productsList.splice(index,1,updateProduct)

    
    renderProducts(); 
}

async function deleteProduct(id){
     
    let deletedProduct = await deleteProductsService(id)

    let index = productsList.findIndex((product => product.id == deletedProduct.id))
   productsList.splice(index,1)

   renderProducts()

}
