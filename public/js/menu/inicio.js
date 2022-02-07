const renderCards = async (cards) => {
  let plantillaHbs = await fetch("plantillas/cards.hbs").then((r) => r.text());
  Handlebars.registerHelper('toLocaleString', function(number) {
    return number.toLocaleString('es-AR')
  })
  var template = Handlebars.compile(plantillaHbs);
  let html = template({ cards });
  document.getElementById("cards-container").innerHTML = html;
};

let arrayImgs = [
  "img/productos/consola-ps5.jpg",
  "img/productos/notebook-msi.jpg",
  "img/productos/samsung-galaxy-s21-plus-5g.jpg",
];

let btnPrev = false;
let btnNext = false;
let contador = 0;

function carrousel() {
  btnPrev = document.querySelector(".carousel-img__btn.prev");
  btnNext = document.querySelector(".carousel-img__btn.next");
  let imgs = document.querySelector(".carousel-img__img");

  btnNext.addEventListener("click", () => {
    contador++;
    if (contador >= arrayImgs.length) {
      contador = 0;
      imgs.src = arrayImgs[contador];
    }

    imgs.src = arrayImgs[contador];
    console.log(contador);
  });

  btnPrev.addEventListener("click", () => {
    contador--;
    imgs.src = arrayImgs[contador];
    if (contador < 0) {
      contador = arrayImgs.length - 1;
      imgs.src = arrayImgs[contador];
    }
    console.log(contador);
  });
}

async function initInicio() {
  console.warn("initInicio()");
  carrousel();
  let products = await productoController.getProducts();
  await renderCards(products);

  document.querySelector(
    ".section-cards__header p"
  ).innerHTML = `Se encontraron ${products.length} productos`;
}
