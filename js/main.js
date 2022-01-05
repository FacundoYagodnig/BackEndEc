// let contadorTv = 0;
// let contadorLa = 0;
// let btnMinus = document.querySelectorAll("#btn-minus");
// let btnPlus = document.querySelectorAll("#btn-plus");
// let productTitle = document.querySelectorAll(".card__heading");

// btnMinus[0].addEventListener("click", function () {
//   if (contadorTv === 0) {
//     alert("Ya no tienes mas productos que quitar!");
//   } else {
//     contadorTv--;
//     console.log(
//       `${productTitle[0].textContent}. Unidades compradas: ${contadorTv}`
//     );
//   }
// });

// btnMinus[1].addEventListener("click", function () {
//   if (contadorLa === 0) {
//     alert("Ya no tienes mas productos que quitar!");
//   } else {
//     contadorLa--;
//     console.log(
//       `${productTitle[1].textContent}. Unidades compradas: ${contadorLa}`
//     );
//   }
// });

// btnPlus[0].addEventListener("click", function () {
//   contadorTv++;
//   console.log(
//     `${productTitle[0].textContent} Unidades compradas: ${contadorTv}"`
//   );
// });
// btnPlus[1].addEventListener("click", function () {
//   contadorLa++;
//   console.log(
//     `${productTitle[1].textContent} Unidades compradas: ${contadorLa}"`
//   );
// });

const ajax = (url, metodo) => {
  let xhr = new XMLHttpRequest();
  xhr.open(metodo || 'get', url)
  xhr.send();

  return xhr;
};

const getFileName = (id) => {
  return 'vistas/' + id + '.html'};

const cargarPlantilla = (id) => {
 
  let fileName = getFileName(id);
  let xhr = ajax(fileName);
  xhr.addEventListener("load", () => {
    if (xhr.status == 200) {
      let plantillas = xhr.response;
      /* Carga del codigo vista html de la plantilla */
      let main = document.querySelector("main");
      main.innerHTML = plantillas;
      /* Carga de los scripts */
      initJS(id)
    }
  });
};

function initJS(id){

  if(id == 'alta'){
initAlta()}

 else if(id == 'inicio'){
initInicio()}

 else if(id == 'nosotros'){
initNosotros()}

 else if(id == 'contacto'){
initContacto()}

 else if(id == 'carrito'){
initCarrito()}

}

function getPlantillas(){
  /* Carga inicial de la plantilla, segun la url visitada */
  let id = location.hash.slice(1) || 'inicio'; //si no esta definido, sale inicio
  cargarPlantilla(id);

  /* Carga de cada uno de los contenidos segun la navegacion local */
  let links = document.querySelectorAll("header nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      let id = link.id;
      console.log(id);
      location.hash = id;
    });
  });

  window.addEventListener("hashchange", () => {
    let id = location.hash.slice(1) || 'inicio'; //si no esta definido, sale inicio
    cargarPlantilla(id);
  });
};

getPlantillas();
