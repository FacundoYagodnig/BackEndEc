let contadorTv = 0
let contadorLa = 0
let btnMinus=document.querySelectorAll('#btn-minus')
let btnPlus=document.querySelectorAll('#btn-plus')
let productTitle = document.querySelectorAll('.card__heading')

    btnMinus[0].addEventListener('click', function(){
       if(contadorTv === 0) {
                alert('Ya no tienes mas productos que quitar!')
               }else{
                   contadorTv--
                   console.log(`${productTitle[0].textContent}. Unidades compradas: ${contadorTv}`)
               }
             
   
    
     })

     btnMinus[1].addEventListener('click', function(){
        if(contadorLa === 0) {
                 alert('Ya no tienes mas productos que quitar!')
                }else{
                    contadorLa--
                    console.log(`${productTitle[1].textContent}. Unidades compradas: ${contadorLa}`)
                }
      })
    

    btnPlus[0].addEventListener('click', function(){
       contadorTv++
               console.log(`${productTitle[0].textContent} Unidades compradas: ${contadorTv}"`)
     })
     btnPlus[1].addEventListener('click', function(){
        contadorLa++
                console.log(`${productTitle[1].textContent} Unidades compradas: ${contadorLa}"`)
      })
    

       
         
    
    
    









