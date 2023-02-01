let acItemUno = document.querySelector("#panelsStayOpen-collapseOne")
let acItemDos = document.querySelector("#panelsStayOpen-collapseTwo")
let acItemTres = document.querySelector("#panelsStayOpen-collapseThree")

let accCajas = document.querySelector("#accCajas")
let accVinos = document.querySelector("#accVinos")
let accDelis = document.querySelector("#accDelis")
let btnEnd = document.getElementById("btnEnd")
let btnInfo = document.getElementById("btnHelp")

let offCanvasCaja = document.getElementById("offCanvasCaja")
let offCanvasVinos = document.getElementById("offCanvasVinos")
let offCanvasDelis = document.getElementById("offCanvasDelis")

var checkeadas = []

const limit = 2
const limitD = 34
var suma = 0
var vinoCant = 0
var chDelis = 0

async function getStock(){
    const response = await fetch("./json/productos.json")
    return response.json();
}

const prodStock = await getStock()

const cajaFinal = {
    estuche: "",
    bebida: {
        vinoUno: "",
        vinoDos: ""
    },
    deli: {
        deliUno: "",
        deliDos: "",
        deliTres: "",
        deliCuatro: ""
    },
    img: "",
    cantidad: 0,
    codigo: 0
}

const cajasFinales = (JSON.parse(localStorage.getItem('cajas')) || []);

const deliArr = Object.values(cajaFinal.deli)

renderProds()

function renderProds() {
    accCajas.innerHTML = ""
    accVinos.innerHTML = ""
    accDelis.innerHTML = ""

    prodStock.forEach((item)=>{
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
            <div class="cCard h-100 pb-3 px-2" id="deli" data-size=${item.size}>
            <input id="cajaInput" type="checkbox" name="deli" class="stretched-link" data-code=${item.codigo}>
            <img src="${item.img}" alt="...">
            <h2>${item.nombre}</h2>
            </div>
            `
            accDelis.append(cards)
        }
    })
}

const cajas = document.getElementsByName("caja")
const vinos = document.getElementsByName("vino")
const delics = document.getElementsByName("deli")
listener(cajas, vinos, delics)

const checker = (arr)=>{
    for(let a of arr){
        if(!(a.checked)){
            a.parentElement.classList.remove("cardColorCheck")
        }
    }
}

function listener(cajas, vinos, delics){
    
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
                    for(let d of delics){
                        if(d.checked){
                            d.checked = false
                            d.parentElement.classList.remove("cardColorCheck")
                        }
                    }
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")    
                }else
                if(c.parentElement.dataset.tam == "doble"){
                    for(let v of vinos){
                        v.type = "checkbox"

                        checkeadas = []
                        
                        checker(vinos)
                        checker(cajas)
                    }
                }
                cajaFinal.bebida.vinoUno = ""
                cajaFinal.bebida.vinoDos = ""
                acItemDos.parentElement.classList.remove("d-none")
                acItemDos.classList.add("show")

                offCanvasCaja.innerHTML =
                `
                <h3 class="me-1 fw-bold">Estuche:</h3>
                <h3> ${cajaFinal.estuche}<h3>
                `

            }
            checker(cajas)
            for(let v of vinos){
                v.checked = false
                v.parentElement.classList.remove("cardColorCheck")
            }

            btnEnd.classList.remove("animate__bounceIn")
            btnEnd.classList.add("animate__bounceOut")
        })
    }

    for(let v of vinos){
        
        v.addEventListener("change", ()=>{
            if(v.checked){
                if(checkeadas.length < limit){
                    v.parentElement.classList.add("cardColorCheck")
                    
                    if(v.type == "checkbox"){
                        acItemTres.parentElement.classList.remove("d-none")
                        acItemTres.classList.add("show")
                        checkeadas.push(v)
                        if(cajaFinal.bebida.vinoUno == ""){
                            cajaFinal.bebida.vinoUno = v.parentElement.childNodes[5].textContent
                        }else{
                            cajaFinal.bebida.vinoDos = v.parentElement.childNodes[5].textContent
                        }

                        if(checkeadas.length == 1){
                            offCanvasVinos.innerHTML =
                            `
                            <h3 class="me-1 fw-bold">Botella:</h3>
                            <div>
                            <h3>${cajaFinal.bebida.vinoUno}</h3>
                            </div>
                            `
                        }
                    }else
                    if(v.type == "radio"){
                        cajaFinal.bebida.vinoUno = v.parentElement.childNodes[5].textContent
                        acItemTres.parentElement.classList.add("d-none")
                        acItemTres.classList.remove("show")

                        vinoCant = 0

                        cajaFinal.img = "./img/icons/Simple.webp"

                        btnEnd.classList.remove("animate__bounceOut")
                        btnEnd.classList.remove("d-none")
                        btnEnd.classList.add("animate__bounceIn")

                        offCanvasVinos.innerHTML =
                        `
                        <h3 class="me-1 fw-bold">Botella:</h3>
                        <div>
                        <h3>${cajaFinal.bebida.vinoUno}</h3>
                        </div>
                        `
                    }
                }else{
                    v.checked = false
                }
                if(checkeadas.length == limit){
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")

                    offCanvasVinos.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Botellas:</h3>
                    <div>
                    <h3>${cajaFinal.bebida.vinoUno}</h3>
                    <h3>${cajaFinal.bebida.vinoDos}</h3>
                    </div>
                    `

                    cajaFinal.img = "./img/icons/Doble2V.webp"

                    btnEnd.classList.remove("animate__bounceOut")
                    btnEnd.classList.remove("d-none")
                    btnEnd.classList.add("animate__bounceIn")
                }
            }else{
                checkeadas.pop(v)
                if(checkeadas.length == 1){
                    acItemTres.parentElement.classList.remove("d-none")
                    acItemTres.classList.add("show")

                    offCanvasVinos.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Botella:</h3>
                    <div>
                    <h3>${cajaFinal.bebida.vinoUno}</h3>
                    </div>
                    `
                }
                if(checkeadas.length == 0){
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")
                    offCanvasVinos.innerHTML = ""
                }

                if(cajaFinal.bebida.vinoDos == v.parentElement.childNodes[5].textContent){
                    cajaFinal.bebida.vinoDos = ""
                }else
                if(cajaFinal.bebida.vinoUno == v.parentElement.childNodes[5].textContent){
                    cajaFinal.bebida.vinoUno = cajaFinal.bebida.vinoDos
                    cajaFinal.bebida.vinoDos = ""
                }

                btnEnd.classList.remove("animate__bounceIn")
                btnEnd.classList.add("animate__bounceOut")
            }
            checker(vinos)
            cajaFinal.deli.deliUno = ""
            cajaFinal.deli.deliDos = ""
            cajaFinal.deli.deliTres = ""
            cajaFinal.deli.deliCuatro = ""
            offCanvasDelis.innerHTML = ""
            for(let i=0; i<deliArr.length; i+=1){
                deliArr[i] = ""
            }
            for(let d of delics){
                d.parentElement.classList.remove("cardColorCheck")
                d.checked = false
            }
            suma = 0
        })
    }

    for(let d of delics){

        d.addEventListener("change", ()=>{
            if(d.checked){
                if((suma + Number(d.parentElement.dataset.size)) > limitD){
                    d.checked = false
                    Swal.fire({
                        icon: 'error',
                        title: 'No hay espacio en la BOX para este producto',
                        text: 'Seleccione o reemplacelo por otro',
                      })
                }else{
                    d.parentElement.classList.add("cardColorCheck")
                    suma += Number(d.parentElement.dataset.size)

                    if(deliArr[0] == ""){
                        deliArr[0] = d.parentElement.childNodes[5].textContent
                        cajaFinal.deli.deliUno = d.parentElement.childNodes[5].textContent
                    }else
                    if(deliArr[1] == ""){
                        deliArr[1] = d.parentElement.childNodes[5].textContent
                        cajaFinal.deli.deliDos = d.parentElement.childNodes[5].textContent
                    }else
                    if(deliArr[2] == ""){
                        deliArr[2] = d.parentElement.childNodes[5].textContent
                        cajaFinal.deli.deliTres = d.parentElement.childNodes[5].textContent

                    }else
                    if(deliArr[3] == ""){
                        deliArr[3] = d.parentElement.childNodes[5].textContent
                        cajaFinal.deli.deliCuatro = d.parentElement.childNodes[5].textContent

                    }
                    chDelis += 1
                }
            }else{
                if(deliArr[3] == d.parentElement.childNodes[5].textContent){
                    deliArr[3] = ""
                    cajaFinal.deli.deliCuatro = ""

                }else
                if(deliArr[2] == d.parentElement.childNodes[5].textContent){
                    deliArr[2] = deliArr[3]
                    deliArr[3] = ""
                    cajaFinal.deli.deliTres = cajaFinal.deli.deliCuatro
                    cajaFinal.deli.deliCuatro = ""

                }else
                if(deliArr[1] == d.parentElement.childNodes[5].textContent){
                    deliArr[1] = deliArr[2]
                    deliArr[2] = deliArr[3]
                    deliArr[3] = ""
                    cajaFinal.deli.deliDos = cajaFinal.deli.deliTres
                    cajaFinal.deli.deliTres = cajaFinal.deli.deliCuatro
                    cajaFinal.deli.deliCuatro = ""
                }else
                if(deliArr[0] == d.parentElement.childNodes[5].textContent){
                    deliArr[0] = deliArr[1]
                    deliArr[1] = deliArr[2]
                    deliArr[2] = deliArr[3]
                    deliArr[3] = ""
                    cajaFinal.deli.deliUno = cajaFinal.deli.deliDos
                    cajaFinal.deli.deliDos = cajaFinal.deli.deliTres
                    cajaFinal.deli.deliTres = cajaFinal.deli.deliCuatro
                    cajaFinal.deli.deliCuatro = ""
                }
            
                d.parentElement.classList.remove("cardColorCheck")
                suma -= Number(d.parentElement.dataset.size)
                chDelis -= 1
            }

            switch(chDelis){
                case 0:{
                    offCanvasDelis.innerHTML = ""
                    break;
                }
                case 1:{
                    offCanvasDelis.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Delicatessen:</h3>
                    <div>
                    <h3>○ ${cajaFinal.deli.deliUno}</h3>
                    </div>
                    `
                    
                    btnEnd.classList.remove("animate__bounceIn")
                    btnEnd.classList.add("animate__bounceOut")
                    break;
                }
                case 2:{
                    offCanvasDelis.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Delicatessen:</h3>
                    <div>
                    <h3>○ ${cajaFinal.deli.deliUno}</h3>
                    <h3>○ ${cajaFinal.deli.deliDos}</h3>
                    </div>
                    `
                    
                    cajaFinal.img = "./img/icons/DobleDeli.webp"
                    btnEnd.classList.remove("animate__bounceOut")
                    btnEnd.classList.remove("d-none")
                    btnEnd.classList.add("animate__bounceIn")
                    break;
                }
                case 3:{
                    offCanvasDelis.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Delicatessen:</h3>
                    <div>
                    <h3>○ ${cajaFinal.deli.deliUno}</h3>
                    <h3>○ ${cajaFinal.deli.deliDos}</h3>
                    <h3>○ ${cajaFinal.deli.deliTres}</h3>
                    </div>
                    `
                    break;
                }
                case 4:{
                    offCanvasDelis.innerHTML =
                    `
                    <h3 class="me-1 fw-bold">Delicatessen:</h3>
                    <div>
                    <h3>○ ${cajaFinal.deli.deliUno}</h3>
                    <h3>○ ${cajaFinal.deli.deliDos}</h3>
                    <h3>○ ${cajaFinal.deli.deliTres}</h3>
                    <h3>○ ${cajaFinal.deli.deliCuatro}</h3>
                    </div>
                    `
                    break;
                }
            }
        })
    }
}

(btnEnd.childNodes[1]).onclick = async ()=>{
    const {value: cantidad} = await Swal.fire({
        title: '¿Cuántas BOX querés agregar al carrito?',
        input: 'number',
        confirmButtonColor: '#9ebc4a',
        confirmButtonText: 'Agregar al carrito',
        inputValidator: (value) => {
            if (!value) {
                return 'Indicá una cantidad'
            }
        }
    })
    if(cantidad){
        cajaFinal.cantidad = cantidad
        cajaFinal.codigo = Math.random()
        cajasFinales.push(cajaFinal)
        localStorage.setItem("cajas", JSON.stringify(cajasFinales))
        
        Swal.fire({
            icon: 'success',
            title: `Agregaste ${cantidad} BOX al carrito`,
        }).then((result)=>{
            if(result.isConfirmed || result.dismiss){
                window.location.reload()
            }
        })
        
    }
}

btnHelp.onclick = ()=>{
    if(window.screen.width > 425){
        Swal.fire({
            width: 1000,
            height: 720,
            html: '<img src="./img/infoCustomBox.jpg" width="100%" height="100%" alt="">',
            showConfirmButton: false
        })
    }else{
        Swal.fire({
            width: 1000,
            height: 720,
            html: '<img src="./img/infoCustomBoxMobile.jpg" width="100%" height="100%" alt="">',
            showConfirmButton: false
        })
    }
}