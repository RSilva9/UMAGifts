const customBoxDisplay = document.getElementById("customBoxDisplay")
const armadasDisplay = document.getElementById("armadasDisplay")
const enviar = document.getElementById("enviar")
const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const envio = document.getElementById("envio")
const envRet = document.getElementById("envRet")
const barrio = document.getElementById("barrio")
const calle = document.getElementById("calle")
const carrito = document.getElementById("carrito")
const formPedido = document.getElementById("formPedido")
const contentBlock = document.getElementById("contentBlock")
const total = document.getElementById("total")
const cajas = JSON.parse(localStorage.getItem("cajas"))
const armadas = JSON.parse(localStorage.getItem("armadas"))
let pedido = document.getElementById("pedido")
let lista = ``
let precioTotal = 0

async function getStock() {
    const response = await fetch("../json/box.json")
    return response.json();
}

const prodStock = await getStock()

function bProd() {
    const borrarProd = document.querySelectorAll("#borrarProd")
}

if(localStorage.getItem("armadas") || localStorage.getItem("cajas")){
    renderCarro()
}else{
    carritoVacio()
}

if(window.screen.width > 425){
    Swal.fire({
        width: 1000,
        html: '<img src="./img/infoCarrito.webp" width="100%" height="100%" alt="">',
        showConfirmButton: false
    })
}else{
    Swal.fire({
        width: 1000,
        html: '<img src="./img/infoCarritoMobile.webp" width="100%" height="100%" alt="">',
        showConfirmButton: false
    })
}

function renderCarro() {
    lista = ``
    precioTotal = 0
    
    if (localStorage.getItem("cajas")) {
        cajas.forEach(caja => {
            let divBox = document.createElement("div")
            if (caja.deli.deliUno != "") {
                divBox.innerHTML =
                    `
                <div class="longCard">
                    <div class="d-flex flex-row flex-grow-1" id="cell">
                        <img src=${caja.img} alt="Box personalizada">
                        <div class="d-flex flex-column">
                            <h3>Estuche: ${caja.estuche}</h3>
                            <div class="d-flex flex-row">
                                <h3>Botella(s):</h3>
                                <div class="d-flex flex-column ms-2">
                                    <h3>${caja.bebida.vinoUno}</h3>
                                    <h3>${caja.bebida.vinoDos}</h3>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-md-row">       
                                <h3>Delicatessen:
                                <button class="buttn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${caja.codigo}" aria-expanded="false" aria-controls="collapseExample">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                                </svg>
                                </button>
                                <div class="collapse" id="collapseExample${caja.codigo}">
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
                    </div>
                    <div class="d-flex flex-row mt-2">
                        <div class="d-flex flex-column align-items-center me-2">
                            <h3>Precio por unidad:</h3>
                            <h3>$${caja.precioFinal}</h3>
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
                </div>
                `

                lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos} || ${caja.deli.deliUno}, ${caja.deli.deliDos}, ${caja.deli.deliTres}, ${caja.deli.deliCuatro} /// CANTIDAD: ${caja.cantidad} /// PRECIO: $${caja.precioFinal}\n\n`
                precioTotal += caja.precioFinal*caja.cantidad
            } else {
                divBox.innerHTML =
                    `
            <div class="longCard">
                <div class="d-flex flex-row flex-grow-1" id="cell">
                    <img src=${caja.img} alt="Box personalizada">
                    <div>
                        <h3>Estuche: ${caja.estuche}</h3>
                        <div class="d-flex flex-row">
                            <h3>Botella(s):</h3>
                            <div class="d-flex flex-column ms-2">
                                <h3>${caja.bebida.vinoUno}</h3>
                                <h3>${caja.bebida.vinoDos}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row mt-2">
                    <div class="d-flex flex-column align-items-center me-2">
                        <h3>Precio por unidad:</h3>
                        <h3>$${caja.precioFinal}</h3>
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
            </div>
            `

                lista += `• Box personalizada: ${caja.estuche} || ${caja.bebida.vinoUno}, ${caja.bebida.vinoDos} /// CANTIDAD: ${caja.cantidad} /// PRECIO: $${caja.precioFinal}\n\n`
                precioTotal += caja.precioFinal*caja.cantidad
            }


            customBoxDisplay.appendChild(divBox)
        })
    }else{
        let divBox = document.createElement("div")
        divBox.innerHTML = "<h5>N/A</h5>"
        customBoxDisplay.appendChild(divBox)
    }

    if (localStorage.getItem("armadas")) {

        armadas.forEach(arm => {
            let divBox = document.createElement("div")
            prodStock.forEach(prod => {
                if (arm.codigo === prod.codigo) {
                    divBox.innerHTML =
                        `
                    <div class="longCard">
                        <div class="d-flex flex-row pb-1 flex-grow-1" id="cell">
                            <img src=${prod.img} alt="Box prearmada">
                            <div class="m-2 flex-grow-1">
                                <h3>${prod.codigo}: BOX de ${prod.tipo} ${prod.tam}</h3>
                                <button class="buttn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${prod.codigo}" aria-expanded="false" aria-controls="collapseExample">
                                    Ver detalles
                                </button>
                                <div class="collapse" id="collapseExample${prod.codigo}">
                                    ${prod.text}
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-2">
                            <div class="d-flex flex-column align-items-center me-2">
                                <h3>Precio por unidad:</h3>
                                <h3>$${arm.precio}</h3>
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
                    </div>
                    `

                    lista += `○ Box ${arm.codigo} /// CANTIDAD: ${arm.cant} /// PRECIO: $${arm.precio}\n\n`
                    precioTotal += arm.precio*arm.cant
                }
            })
            armadasDisplay.appendChild(divBox)
        })
    }else{
        let divBox = document.createElement("div")
        divBox.innerHTML = "<h5>N/A</h5>"
        armadasDisplay.appendChild(divBox)
    }

    assignListener()

    pedido.value = lista
    pedido.value += `\n\n PRECIO TOTAL: $${precioTotal}`
    total.textContent = `$${precioTotal}`
}

function assignListener() {
    if (borrarProd.length > 1) {
        for (let b of borrarProd) {
            b.addEventListener('click', () => {
                if(cajas && cajas.length > 0){
                    for (let c of cajas) {
                        if (c.codigo == b.dataset.cod) {
                            const index = cajas.indexOf(c)
                            cajas.splice(index, 1)
                            if(cajas.length > 0){
                                localStorage.setItem("cajas", JSON.stringify(cajas))
                            }else{
                                localStorage.removeItem("cajas")
                            }
                            precioTotal -= c.precio*c.cantidad
                        }
                    }
                }
                if(armadas && armadas.length > 0){
                    for (let a of armadas) {
                        if (a.codigo === b.dataset.cod) {
                            const index = armadas.indexOf(a)
                            armadas.splice(index, 1)
                            if(armadas.length > 0){
                                localStorage.setItem("armadas", JSON.stringify(armadas))
                            }else{
                                localStorage.removeItem("armadas")
                            }
                            precioTotal -= a.precio*a.cant
                        }
                    }
                }    
                clearCarro()
                if(localStorage.getItem("armadas") || localStorage.getItem("cajas")){
                    renderCarro()
                }else{
                    carritoVacio()
                }
            })
        }
    } else {
        borrarProd.addEventListener('click', () => {
            if(cajas){
                for (let c of cajas) {
                    if (c.codigo == borrarProd.dataset.cod) {
                        const index = cajas.indexOf(c)
                        cajas.splice(index, 1)
                        if(cajas.length > 0){
                            localStorage.setItem("cajas", JSON.stringify(cajas))
                        }else{
                            localStorage.removeItem("cajas")
                        }
                        precioTotal -= c.precio*c.cantidad
                    }
                }
            }
            if(armadas){
                for (let a of armadas) {
                    if (a.codigo === borrarProd.dataset.cod) {
                        const index = armadas.indexOf(a)
                        armadas.splice(index, 1)
                        if(armadas.length > 0){
                            localStorage.setItem("armadas", JSON.stringify(armadas))
                        }else{
                            localStorage.removeItem("armadas")
                        }
                        precioTotal -= a.precio*a.cant
                    }
                }
            }
            clearCarro()
            if(localStorage.getItem("armadas") || localStorage.getItem("cajas")){
                renderCarro()
            }else{
                carritoVacio()
            }
        })
    }
}

function clearCarro() {
    while (armadasDisplay.lastElementChild) {
        armadasDisplay.removeChild(armadasDisplay.lastElementChild)
    }
    while (customBoxDisplay.lastElementChild) {
        customBoxDisplay.removeChild(customBoxDisplay.lastElementChild)
    }
}

enviar.onclick = ()=>{
    if(nombre.value!="" && email.value!=""){
        localStorage.clear()
    }
}

function carritoVacio(){
    lista =``
    carrito.classList.add("d-none")
    formPedido.classList.add("d-none")
    let div = document.createElement("div")
    div.classList.add("carritoVacio")
    div.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
    </svg>
    <h2>Tu carrito está vacío</h2>
    `
    contentBlock.appendChild(div)
}

let inputs = document.querySelectorAll("#envRet input")

envio.addEventListener('click', ()=>{
    
    if(envio.checked){
        envRet.classList.remove("d-none")
        envRet.setAttribute("id", "envRet")

        inputs.forEach(i=>{
            i.setAttribute("required", "")
        })
    }else{
        envRet.classList.add("d-none")
        envRet.removeAttribute("id")

        inputs.forEach(i=>{
            i.removeAttribute("required")
            i.value = ""
        })
    }
})