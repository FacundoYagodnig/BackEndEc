  class AltaForm {
    form = null
    inputs = null
    btnSubmit = null
    validationArray = [false, false, false, false, false, false];

    /* --------------------------drag and drop------------------------------*/  
    imagenSubida = '' 
    dropArea = null
    progressBar = null
    /* --------------------------drag and drop------------------------------*/ 

    regExpArray = [
      /^(([A-Z][a-z]{2,20}( [\d]{0,3}){0,3})){0,3}$/,     //nombre
      /^[\d]+$/,                                          //precio
      /^[\d]+$/,                                          //stock
      /^.+$/,                                             //brand
      /^.+$/,                                             //category
      /^.+$/                                              //detalles
    ];

    constructor(renderTablaAlta, saveProduct ){
      this.form = document.querySelector('.alta-container__form');
      this.inputs = document.querySelectorAll('.alta-container form input.data-validation');
      this.btnSubmit = document.querySelector('#submit-btn');

      this.btnSubmit.disabled = true;

      this.inputs.forEach((input, index) => { 
        
        if(input.type != 'checkbox') {
          input.addEventListener("input", () => {
            this.validator(input.value, this.regExpArray[index], index);
            if(renderTablaAlta) renderTablaAlta(!this.invalidFields(), productoController.productsList)
          });
        }
      });
  
      this.form.addEventListener("submit", e => { //porque poner este y el anterior recorrido para renderizar la tabla dentro del constructor?
        e.preventDefault();
       
        let product =  this.leerProductoIngresado()
        this.limpiarFormulario()

        if(saveProduct) saveProduct(product)
      });

      /* --------------------------drag and drop------------------------------*/  
      this.dropArea = document.getElementById('drop-area')
      this.progressBar = document.getElementById('progress-bar')
      

      //Cancelar evento automatico de drag and drop
      ;['dragcenter', 'dragover', 'dragleave', 'drop'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, e => e.preventDefault())
        document.body .addEventListener(eventName, e => e.preventDefault())
      })

      //remarcar la zona de drop al arrastrar una imagen dentro
      ;['dragcenter', 'dragover'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, () => {
          this.dropArea.classList.add('highlight')

        })
      })

      //desmarcar la zona de drop al abandonarla
      ;['dragleave', 'drop'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, () => {
          this.dropArea.classList.remove('highlight')
        })
      })

      this.dropArea.addEventListener('drop', e => {
        var dt = e.dataTransfer
        var files = dt.files

        this.handleFiles(files)
      })

      /* --------------------------drag and drop------------------------------*/ 
    }
   
  setCustomCartel = function(mensaje, index) {
    let divs = document.querySelectorAll(".input-container div");
    divs[index].innerHTML = mensaje;
    divs[index].style.display = mensaje ? "block" : "none";
  };

  invalidFields() {
    //si cualquiera de las validaciones es false , son todas false , si son todas true queda en true y luego retorna el contrario para que lo tome el boton.disabled y se habilite o no
    let valid =
    this.validationArray[0] &&
    this.validationArray[1] &&
    this.validationArray[2] &&
    this.validationArray[3] &&
    this.validationArray[4] &&
    this.validationArray[5]  

    console.log(`Are all the fields valid? : ${valid}`);
    return !valid;
  };

   validator (value, regExp, index) {
    
    if (!regExp.test(value)) {
      this.setCustomCartel('invalid value', index)
      this.validationArray[index] = false; //si falla la validacion, lo pasamos a false , ya que si la validacion sucede, pasara a true y el boton lo pasa a false mediante la funcion
      this.btnSubmit.disabled = true; //boton deshabilitado
  
      return null;
    }

    this.validationArray[index] = true;
    this.btnSubmit.disabled = this.invalidFields(); //la funcion toma el valor de validationArray y lo pasa de true a false o de false a true. En este caso si todas son true lo pasa a false y se habilita
    this.setCustomCartel("", index);
    return value;
  };

   leerProductoIngresado(){
    return  {
      name: this.inputs[0].value,
      price: this.inputs[1].value,
      stock: this.inputs[2].value,
      brand: this.inputs[3].value,
      category: this.inputs[4].value,
      details: this.inputs[5].value,
      photo: this.imagenSubida? `/uploads/${this.imagenSubida}` : '', //si existe, agregame la ruta a la imagen
      send: this.inputs[6].checked,
      cantidad : 0,
      total: 0
    };

    
  }

  limpiarFormulario(){
    
    this.inputs.forEach(input => {
    
      if(input.type != 'checkbox') input.value = ''
      else if(input.type == 'checkbox') input.checked = false
  })
    this.btnSubmit.disabled = true;
    this.validationArray = [false, false, false, false, false, false];

    let img = document.querySelector('#gallery img')
    img.src = ''

    this.initializeProgress()
    this.imagenSubida = ''
  }

  /* --------------------------drag and drop------------------------------*/ 

  initializeProgress(){
    this.progressBar.value = 0
  }

  updateProgress(porcentaje) {
    this.progressBar.value = porcentaje
  }

  previewFile(file){
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function(){
      let img = document.querySelector('#gallery img')
      img.src = reader.result
    }
  }

  handleFiles = files => {
    let file = files[0]

    this.initializeProgress()
    this.uploadFile(file)
    this.previewFile(file)
  }

  uploadFile = file => {
    var url = '/upload'

    var xhr = new XMLHttpRequest()
    var formdata = new FormData() //storage del navegador que procesa info binaria

    xhr.open('POST', url)

    xhr.upload.addEventListener('progress', e => {
      let porcentaje = (((e.loaded * 100) / e.total) || 100)
      this.updateProgress(porcentaje)
    })

    xhr.addEventListener('load', () => {
      if(xhr.status == 200){
          this.imagenSubida = JSON.parse(xhr.response).nombre     //recibimos del back y respondemos a la vista
      }

    })

    formdata.append('foto', file)  // esto es lo que va a relacionar el archivo que obtengamos del front, con el back
    xhr.send(formdata) //enviamos la informacion al back

  }
}
  /* --------------------------drag and drop------------------------------*/ 

function renderTablaAlta(validos, productsList) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "plantillas/listado.hbs");
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      let plantillaHbs = xhr.response;

      var template = Handlebars.compile(plantillaHbs);
      let html = template({ productsList, validos });

      document.getElementById("product-list").innerHTML = html;
    }
  });
  xhr.send();
};


let formularioAlta = null

async function initAlta() {
  console.warn('initAlta()')

  formularioAlta = new AltaForm(renderTablaAlta, productoController.saveProduct)

  let productsList = await productoController.getProducts()
  renderTablaAlta(null, productsList)
}

