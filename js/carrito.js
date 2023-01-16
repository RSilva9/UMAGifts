const customBoxDisplay = document.getElementById("customBoxDisplay")
const armadasDisplay = document.getElementById("armadasDisplay")
const limpiar = document.getElementById("limpiar")
const terminar = document.getElementById("terminarCarrito")
let pedido = document.getElementById("pedido")
let lista = ``

async function getStock(){
    const response = await fetch("./json/box.json")
    return response.json();
}

const prodStock = await getStock()

if(localStorage.getItem("cajas")){
    const cajas = JSON.parse(localStorage.getItem("cajas"))
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
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
            </div>
            `

            lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos} || ${caja.deli.deliUno}, ${caja.deli.deliDos}, ${caja.deli.deliTres}, ${caja.deli.deliCuatro}\n`
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
        </div>
        `

        lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos}\n`
        }

        
        customBoxDisplay.appendChild(divBox)
    });
}

if(localStorage.getItem("armadas")){
    const armadas = JSON.parse(localStorage.getItem("armadas"))
    armadas.forEach(arm =>{
        let divBox = document.createElement("div")
        prodStock.forEach(prod =>{
            if(arm.codigo === prod.codigo){
                if(prod.deli === false){
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
                    </div>
                    `
                    armadasDisplay.appendChild(divBox)

                    lista += `○ Box ${arm.codigo}\n`
                }else{
                    divBox.innerHTML =
                    `
                    <div class="longCard">
                        <img src=${prod.img} alt="Box prearmada">
                        <div class="m-2 flex-grow-1">
                            <h3>BOX de ${prod.tipo} ${prod.tam} con delicatessen</h3>
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
                    </div>
                    `
                    armadasDisplay.appendChild(divBox)

                    lista += `○ Box ${arm.codigo}\n`
                }
            }
        })
    })
}



terminar.onclick = ()=>{
    console.log(lista)
    pedido.value = lista
    
}

limpiar.onclick = ()=>{
    localStorage.clear()
}