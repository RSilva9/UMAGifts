const customBoxDisplay = document.getElementById("customBoxDisplay")
const armadasDisplay = document.getElementById("armadasDisplay")
const limpiar = document.getElementById("limpiar")
const terminar = document.getElementById("terminarCarrito")
const cajas = JSON.parse(localStorage.getItem("cajas"))
const armadas = JSON.parse(localStorage.getItem("armadas"))
let pedido = document.getElementById("pedido")
let lista = ``

async function getStock(){
    const response = await fetch("./json/box.json")
    return response.json();
}

const prodStock = await getStock()

function bProd(){
    const borrarProd = document.querySelectorAll("#borrarProd")
}

renderCarro()

function renderCarro(){
    lista = ``

    if(localStorage.getItem("cajas")){
        
        cajas.forEach(caja => {
            let divBox = document.createElement("div")
            if(caja.deli.deliUno != ""){
                divBox.innerHTML =
                `
                <div class="longCard">
                    <img src=${caja.img} alt="Box personalizada">
                    <div class="d-flex flex-column flex-grow-1">
                        <h3>Estuche: ${caja.estuche}</h3>
                        <div class="d-flex flex-row">
                            <h3>Botella(s):</h3>
                            <div class="d-flex flex-column ms-2">
                                <h3>${caja.bebida.vinoUno}</h3>
                                <h3>${caja.bebida.vinoDos}</h3>
                            </div>
                        </div>
                        <div class="d-flex flex-column flex-md-row">       
                            <h3>Delicatessen
                            <button class="buttn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                            </svg>
                            </button>
    
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <div class="d-flex flex-column ms-2">
                                    <h3>${caja.deli.deliUno}</h3>
                                    <h3>${caja.deli.deliDos}</h3>
                                    <h3>${caja.deli.deliTres}</h3>
                                    <h3>${caja.deli.deliCuatro}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <h3>Cantidad:</h3>
                        <h3>${caja.cantidad}</h3>
                    </div>
                    <a class="m-3" id="borrarProd" data-cod=${caja.codigo}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </a>
                </div>
                `
    
                lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos} || ${caja.deli.deliUno}, ${caja.deli.deliDos}, ${caja.deli.deliTres}, ${caja.deli.deliCuatro} /// CANTIDAD: ${caja.cantidad}\n`
            }else{
                divBox.innerHTML =
            `
            <div class="longCard">
                <img src=${caja.img} alt="Box personalizada">
                <div class="flex-grow-1">
                    <h3>Estuche: ${caja.estuche}</h3>
                    <div class="d-flex flex-row">
                        <h3>Botella(s):</h3>
                        <div class="d-flex flex-column ms-2">
                            <h3>${caja.bebida.vinoUno}</h3>
                            <h3>${caja.bebida.vinoDos}</h3>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <h3>Cantidad:</h3>
                    <h3>${caja.cantidad}</h3>
                </div>
                <a class="m-3" id="borrarProd" data-cod=${caja.codigo}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </a>
            </div>
            `
    
            lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos} /// CANTIDAD: ${caja.cantidad}\n`
            }
    
            
            customBoxDisplay.appendChild(divBox)
        })
    }
    
    if(localStorage.getItem("armadas")){
        
        armadas.forEach(arm =>{
            let divBox = document.createElement("div")
            prodStock.forEach(prod =>{
                if(arm.codigo === prod.codigo){
                    divBox.innerHTML =
                    `
                    <div class="longCard">
                        <img src=${prod.img} alt="Box prearmada">
                        <div class="m-2 flex-grow-1">
                            <h3>BOX de ${prod.tipo} ${prod.tam}</h3>
                            <button class="buttn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${prod.codigo}" aria-expanded="false" aria-controls="collapseExample">
                                Ver detalles
                            </button>
                            <div class="collapse" id="collapseExample${prod.codigo}">
                                ${prod.text}
                            </div>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <h3>Cantidad:</h3>
                            <h3>${arm.cant}</h3>
                        </div>
                        <a class="m-3" id="borrarProd" data-cod=${prod.codigo}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </a>
                    </div>
                    `
    
                    lista += `○ Box ${arm.codigo} /// CANTIDAD: ${arm.cant} \n`
                }
            })
            armadasDisplay.appendChild(divBox)
        })
    }
}

if(borrarProd.length > 1){
    for(let b of borrarProd){
        b.addEventListener('click', ()=>{
            for(let c of cajas){
                if(c.codigo == b.dataset.cod){
                    const index = cajas.indexOf(c)
                    cajas.splice(index, 1)
                    localStorage.setItem("cajas", JSON.stringify(cajas))
                }
            }
            for(let a of armadas){
                if(a.codigo === b.dataset.cod){
                    const index = armadas.indexOf(a)
                    armadas.splice(index, 1)
                    localStorage.setItem("armadas", JSON.stringify(armadas))
                }
            }
            renderCarro()
            console.log(borrarProd)
        })
        
    }
}else{
    borrarProd.addEventListener('click', ()=>{
        for(let c of cajas){
            if(c.codigo == borrarProd.dataset.cod){
                const index = cajas.indexOf(c)
                cajas.splice(index, 1)
                localStorage.setItem("cajas", JSON.stringify(cajas))
            }
        }
        for(let a of armadas){
            if(a.codigo === borrarProd.dataset.cod){
                const index = armadas.indexOf(a)
                armadas.splice(index, 1)
                localStorage.setItem("armadas", JSON.stringify(armadas))
            }
        }
        renderCarro()
        console.log(borrarProd)
    })
}

function clearCarro(){
    while (armadasDisplay.lastElementChild) {
        armadasDisplay.removeChild(armadasDisplay.lastElementChild)
    }
    while (customBoxDisplay.lastElementChild) {
        customBoxDisplay.removeChild(customBoxDisplay.lastElementChild)
    }
}

terminar.onclick = ()=>{
    console.log(lista)
    pedido.value = lista
}

limpiar.onclick = ()=>{
    localStorage.clear()
}