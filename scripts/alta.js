function initAlta() {
    console.log('initAlta()')
  //selectores
  const alta_container = document.querySelector(".alta-container");
  const form = alta_container.querySelector("form");
  const selects = alta_container.querySelectorAll('select')
  const inputs = alta_container.querySelectorAll("input[type=text]");
  const btnSubmit = alta_container.querySelector("#submit-btn");
  let products = [];
  //boton deshabilitado al inicio
  btnSubmit.disabled = true;
  let validationArray = [false, false, false, false, false];

  let regExpArray = [
    /^[A-Z][a-z]{3,20}$/,
    /^([\d])+$/,
    /^([\d])+$/,
    /^.+$/,
    /^([a-z]|[A-Z]){3,150}$/,
  ];

  //si cualquiera de las posiciones del array es falso retorna true
  const invalidFields = () => {
    //si cualquiera de las validaciones es false , son todas false , si son todas true queda en true y luego retorna el contrario para que lo tome el boton.disabled y se habilite o no
    let valid =
      validationArray[0] &&
      validationArray[1] &&
      validationArray[2] &&
      validationArray[3] &&
      validationArray[4];

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
      console.log(validationArray[index]);
      setCustomCartel(mensaje, index);
      return null;
    }

    validationArray[index] = true;
    btnSubmit.disabled = invalidFields(); //la funcion toma el valor de validationArray y lo pasa de true a false o de false a true. En este caso si todas son true lo pasa a false y se habilita
    console.log(btnSubmit.disabled);
    setCustomCartel("", index);
    return value;
  };

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      validator(input.value, regExpArray[index], index);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let option = selects[0].options[selects[0].selectedIndex].text
    let option2 = selects[1].options[selects[1].selectedIndex].text
      
    let product = {
      name: inputs[0].value,
      price: inputs[1].value,
      stock: inputs[2].value,
      brand:  option,
      category: option2,
      photo: inputs[3].value,
      details: inputs[4].value,
    };

    products.push(product);
    console.log(products);
    renderProducts();

    inputs.forEach((input) => (input.value = ""));
    btnSubmit.disabled = true;
    validationArray = [false, false, false, false];
  });

  const renderProducts = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "plantillas/listado.hbs");
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        let plantillaHbs = xhr.response;
        console.log(plantillaHbs);

        var template = Handlebars.compile(plantillaHbs);
        let html = template({ products: products });

        document.getElementById("product-list").innerHTML = html;
      }
    });
    xhr.send();
  };

  renderProducts();
}
