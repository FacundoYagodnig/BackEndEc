function initInicio() {
console.warn('initInicio()')

function Card(heading, description, image) {
    this.heading = heading
    this.description = description
    this.image = image

    // this.appendTo = function(destinationElement){
    //     let card = document.createElement('a')
    //     card.classList.add('card')
    //     card.href = '#'
      
    //     card.innerHTML = ` 
    //         <article class="card__article">
    //             <div 
    //                 class="card__image"
    //                 style="background-image: url('${image}')">
    //             </div>

    //             <div class="card__content">
    //             <h3 class="card__heading">${heading}</h3>
    //             <div class="card__description">
    //                 <p>${description}</p>
    //             </div>
    //             <div class="btn-container">
    //                 <button class="btn-minus" id="btn-minus">-</button>
    //                 <button class="btn-plus" id="btn-plus">+</button>
    //             </div>
    //             </div>
    //         </article>

    //         `
       
    //     card.addEventListener('click', (e) => {
    //         e.preventDefault()
    //         console.log(this)
    //     })
    //     destinationElement.appendChild(card)
    //}
}

let cards = [
    new Card('notebook lenovo', 'con 2 juegos', 'img/productos/notebook-lenovo.jpg'),
    new Card('apple iphone 11 pro max', 'con 2 juegos', 'img/productos/apple-iphone-11-pro-max.jpg'),
    new Card('camara canon', 'con 2 juegos', 'img/productos/camara-canon.jpg'),
    new Card('auriculares sony', 'con 2 juegos', 'img/productos/auriculares-sony.jpg'),
    new Card('parlante jbl', 'con 2 juegos', 'img/productos/parlante-jbl.jpg'),
    new Card('google nest mini', 'con 2 juegos', 'img/productos/google-nest-mini.jpg'),
    new Card('samsung galaxy s21 plus 5g', 'con 2 juegos', 'img/productos/samsung-galaxy-s21-plus-5g.jpg'),
    new Card('drone dji', 'con 2 juegos', 'img/productos/drone-dji.jpg'),                   
    new Card('notebook lenovo', 'con 2 juegos', 'img/productos/notebook-lenovo.jpg'),      
    new Card('dji mavic 2 pro', 'con 2 juegos', 'img/productos/dji-mavic-2-pro.jpg'),       
    new Card('camara canon', 'con 2 juegos', 'img/productos/camara-canon.jpg'),             
    new Card('chromecast google', 'con 2 juegos', 'img/productos/chromecast-google.jpg'),   
    new Card('parlante jbl', 'con 2 juegos', 'img/productos/parlante-jbl.jpg'),             
    new Card('google nest-mini', 'con 2 juegos', 'img/productos/google-nest-mini.jpg'),     
    new Card('televisor lg', 'con 2 juegos', 'img/productos/televisor-lg.jpg'),             
    new Card('drone dji', 'con 2 juegos', 'img/productos/drone-dji.jpg'),    
]


// for (const card of cards) {
//     card.appendTo(cardsContainer)
// }

const renderProducts = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "plantillas/cards.hbs");
    xhr.addEventListener("load", () => {
      if (xhr.status == 200) {
        let cardsHbs = xhr.response;
        var template = Handlebars.compile(cardsHbs);
        let html = template({ cards: cards });

        document.getElementById("cards-container").innerHTML = html;
      }
    });
    xhr.send();
  };

  renderProducts()
}