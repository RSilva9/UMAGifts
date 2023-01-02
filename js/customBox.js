let acItemUno = document.querySelector("#panelsStayOpen-collapseOne")
let acItemDos = document.querySelector("#panelsStayOpen-collapseTwo")
let acItemTres = document.querySelector("#panelsStayOpen-collapseThree")

let accCajas = document.querySelector("#accCajas")
let accVinos = document.querySelector("#accVinos")
let accDelis = document.querySelector("#accDelis")

renderProds()

function renderProds() {
    accCajas.innerHTML = ""
    accVinos.innerHTML = ""
    accDelis.innerHTML = ""

    fetch("./json/productos.json")
        .then((res) => res.json())
        .then((items) => {
            for (let item of items) {    
                if(item.tipo == "estuche"){
                    let cards = document.createElement("div")
                    cards.innerHTML =
                    `
                    <div class="cCard h-100 p-2 cardHover">
                    <img src="${item.img}" alt="...">
                    <h2>${item.nombre}</h2>
                    </div>
                    `
                    accCajas.append(cards)
                }
                if(item.tipo == "bebida"){
                    let cards = document.createElement("div")
                    cards.innerHTML =
                    `
                    <div class="cCard h-100 p-2 cardHover">
                    <img src="${item.img}" alt="...">
                    <h2>${item.nombre}</h2>
                    </div>
                    `
                    accVinos.append(cards)
                }
                if(item.tipo == "deli"){
                    let cards = document.createElement("div")
                    cards.innerHTML =
                    `
                    <div class="cCard h-100 p-2 cardHover">
                    <img src="${item.img}" alt="...">
                    <h2>${item.nombre}</h2>
                    </div>
                    `
                    accDelis.append(cards)
                }
            }
        })
}