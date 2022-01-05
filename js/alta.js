//selectores/declaraciones
let alta_container
let form 
let selects 
let inputs 
let btnSubmit 
let validationArray 
let option 
let option2 



let regExpArray = [
  /^[A-Z][a-z]{3,20}$/,     //nombre
  /^([\d])+$/,              //precio
  /^([\d])+$/,              //stock
  /^.+$/,                   //foto
  /^([a-z]|[A-Z]){3,150}$/, //detalles
];

const invalidFields = () => {
  //si cualquiera de las validaciones es false , son todas false , si son todas true queda en true y luego retorna el contrario para que lo tome el boton.disabled y se habilite o no
  let valid =
    validationArray[0] &&
    validationArray[1] &&
    validationArray[2] &&
    validationArray[3] &&
    validationArray[4] 
   
  console.log(`Are all the fields valid? : ${valid}`);
  return !valid;
};

const setCustomCartel = function (mensaje, index) {
  let divs = document.querySelectorAll(".input-container div");
  divs[index].innerHTML = mensaje;
  divs[index].style.display = mensaje ? "block" : "none";
};

const validator = (value, regExp, index) => {
  let mensaje = "";

  if (!regExp.test(value)) {
    mensaje = "Invalid value";
    validationArray[index] = false; //si falla la validacion, lo pasamos a false , ya que si la validacion sucede, pasara a true y el boton lo pasa a false mediante la funcion
    btnSubmit.disabled = true; //boton deshabilitado
    setCustomCartel(mensaje, index);
    return null;
  }

  validationArray[index] = true;
  btnSubmit.disabled = invalidFields(); //la funcion toma el valor de validationArray y lo pasa de true a false o de false a true. En este caso si todas son true lo pasa a false y se habilita
  setCustomCartel("", index);
  return value;
};

const renderProducts = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "plantillas/listado.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      let plantillaHbs = xhr.response;

      var template = Handlebars.compile(plantillaHbs);
      let html = template({ productsList, validos: !invalidFields() });

      document.getElementById("product-list").innerHTML = html;
    }
  });
  xhr.send();
};

 function leerProductoIngresado(){
  return  {
      name: inputs[0].value,
      price: inputs[1].value,
      stock: inputs[2].value,
      brand:  option,
      category: option2,
      photo: inputs[3].value,
      details: inputs[4].value,
      send: inputs[5].checked,
  };
}

function limpiarFormulario(){
  
  inputs.forEach(input => {
   
    if(input.type != 'checkbox') input.value = ''
    else if(input.type == 'checkbox') input.checked = false
})
  btnSubmit.disabled = true;
  validationArray = [false, false, false, false, false, false];
}

async function initAlta() {
  console.log('initAlta()')
 
  alta_container = document.querySelector(".alta-container");
  form = alta_container.querySelector("form");
  selects = alta_container.querySelectorAll('select')
  inputs = alta_container.querySelectorAll(".alta-container form input");
  btnSubmit = alta_container.querySelector("#submit-btn");

  
  //boton deshabilitado al inicio
  btnSubmit.disabled = true;
  validationArray = [false, false, false, false, false, false];  
  
  inputs.forEach((input, index) => { 
    if(input.type != 'checkbox') {
      input.addEventListener("input", () => {
        validator(input.value, regExpArray[index], index);
        renderProducts()
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    option = selects[0].options[selects[0].selectedIndex].text
    option2 = selects[1].options[selects[1].selectedIndex].text
      
    saveProduct()

  });
  
   getProducts()
 
}
