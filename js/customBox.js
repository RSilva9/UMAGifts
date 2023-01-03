let acItemUno = document.querySelector("#panelsStayOpen-collapseOne")
let acItemDos = document.querySelector("#panelsStayOpen-collapseTwo")
let acItemTres = document.querySelector("#panelsStayOpen-collapseThree")

let accCajas = document.querySelector("#accCajas")
let accVinos = document.querySelector("#accVinos")
let accDelis = document.querySelector("#accDelis")

const cajaFinal = {
    estuche: "",
    bebida: {
        vinoUno: "",
        vinoDos: ""
    },
    deli: {
        deliUno: "",
        deliDos: "",
        deliTres: ""
    }
}

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
                    <div class="cCard h-100 pb-3 px-2" id="caja" data-tam=${item.tam}>
                    <input id="cajaInput" type="radio" name="caja" class="stretched-link">
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
                    <div class="cCard h-100 pb-3 px-2" id="vino">
                    <input id="cajaInput" type="checkbox" name="vino" class="stretched-link">
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
                    <div class="cCard h-100 pb-3 px-2" id="deli">
                    <input id="cajaInput" type="checkbox" name="deli" class="stretched-link" data-code=${item.codigo}>
                    <img src="${item.img}" alt="...">
                    <h2>${item.nombre}</h2>
                    </div>
                    `
                    accDelis.append(cards)
                }
            }
        })  
}

setTimeout(() => {
    const cajas = document.getElementsByName("caja")
    const vinos = document.getElementsByName("vino")
    const delics = document.getElementsByName("deli")
    listener(cajas, vinos, delics)
}, 500);

const checker = (arr)=>{
    for(let a of arr){
        if(!(a.checked)){
            a.parentElement.classList.remove("cardColorCheck")
        }
    }
}

const listener = (cajas, vinos, delics)=>{
    
    var checkeadas = []
    const limit = 2
    const limitD = 6
    let suma = 0

    for(let c of cajas){       

        c.addEventListener("change", ()=>{
            if(c.checked){
                c.parentElement.classList.add("cardColorCheck")
                cajaFinal.estuche = c.parentElement.childNodes[5].textContent
                if(c.parentElement.dataset.tam == "simple"){
                    for(let v of vinos){
                        v.type = "radio"
                        
                        checkeadas = []
                        
                        checker(vinos)
                        checker(cajas)
                    }
                }else
                if(c.parentElement.dataset.tam == "doble"){
                    for(let v of vinos){
                        v.type = "checkbox"
                    }
                }
                acItemDos.parentElement.classList.remove("d-none")
                acItemDos.classList.add("show")
            }
            checker(cajas)
            for(let v of vinos){
                v.checked = false
                v.parentElement.classList.remove("cardColorCheck")
            }
        })
    }

    for(let v of vinos){
        
        v.addEventListener("change", ()=>{
            if(v.checked){
                if(checkeadas.length < limit){
                    v.parentElement.classList.add("cardColorCheck")
                    acItemTres.parentElement.classList.remove("d-none")
                    acItemTres.classList.add("show")
                    if(v.type == "checkbox"){
                        checkeadas.push(v)
                        if(cajaFinal.bebida.vinoUno == ""){
                            cajaFinal.bebida.vinoUno = v.parentElement.childNodes[5].textContent
                        }else{
                            cajaFinal.bebida.vinoDos = v.parentElement.childNodes[5].textContent
                        }
                        
                    }else
                    if(v.type == "radio"){
                        cajaFinal.bebida = v.parentElement.childNodes[5].textContent
                        acItemTres.parentElement.classList.add("d-none")
                        acItemTres.classList.remove("show")
                    }
                }else{
                    v.checked = false
                }
                if(checkeadas.length == limit){
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")
                }
            }else{
                checkeadas.pop(v)
                if(checkeadas.length < limit){
                    acItemTres.parentElement.classList.remove("d-none")
                    acItemTres.classList.add("show")
                }
                if(checkeadas.length == 0){
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")
                }

                if(cajaFinal.bebida.vinoDos == v.parentElement.childNodes[5].textContent){
                    cajaFinal.bebida.vinoDos = ""
                }else
                if(cajaFinal.bebida.vinoUno == v.parentElement.childNodes[5].textContent){
                    cajaFinal.bebida.vinoUno = cajaFinal.bebida.vinoDos
                    cajaFinal.bebida.vinoDos = ""
                }
            }
            checker(vinos)
            console.log(checkeadas.length)
        })
    }

    for(let d of delics){
        

        d.addEventListener("change", ()=>{
            
        })
    }
}





function RenderCajaFinal(checkeadas){
    let cfContainer = document.getElementById("cajaFinalContainer")
    if(checkeadas.length == 2){
        cfContainer.innerHTML=`
        <h3>Estuche: ${cajaFinal.estuche}</h3>
        <h3>Bebidas: ${cajaFinal.bebida.vinoUno}, <br>${cajaFinal.bebida.vinoDos}</h3>
        `
    }else{
        cfContainer.innerHTML=`
        <h3>Estuche: ${cajaFinal.estuche}</h3>
        <h3>Bebida: ${cajaFinal.bebida}</h3>
        `
    }
    
}