let acItemUno = document.querySelector("#panelsStayOpen-collapseOne")
let acItemDos = document.querySelector("#panelsStayOpen-collapseTwo")
let acItemTres = document.querySelector("#panelsStayOpen-collapseThree")

let accCajas = document.querySelector("#accCajas")
let accVinos = document.querySelector("#accVinos")
let accDelis = document.querySelector("#accDelis")

let btnEnd = document.getElementById("btnEnd")
var checkeadas = []

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
    }
}

const deliArr = Object.values(cajaFinal.deli)

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
                    <div class="cCard h-100 pb-3 px-2" id="deli" data-size=${item.size}>
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
     
    const limit = 2
    const limitD = 34
    var suma = 0
    
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
            }
            checker(cajas)
            for(let v of vinos){
                v.checked = false
                v.parentElement.classList.remove("cardColorCheck")
            }
            btnEnd.parentElement.classList.add("d-none")
            btnEnd.parentElement.classList.remove("d-flex")
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
                        
                    }else
                    if(v.type == "radio"){
                        cajaFinal.bebida.vinoUno = v.parentElement.childNodes[5].textContent
                        acItemTres.parentElement.classList.add("d-none")
                        acItemTres.classList.remove("show")
                        btnEnd.parentElement.classList.remove("d-none")
                        btnEnd.parentElement.classList.add("d-flex")
                    }
                }else{
                    v.checked = false
                }
                if(checkeadas.length == limit){
                    acItemTres.parentElement.classList.add("d-none")
                    acItemTres.classList.remove("show")
                    btnEnd.parentElement.classList.remove("d-none")
                    btnEnd.parentElement.classList.add("d-flex")
                }
            }else{
                checkeadas.pop(v)
                if(checkeadas.length == 1){
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
                btnEnd.parentElement.classList.add("d-none")
                btnEnd.parentElement.classList.remove("d-flex")
            }
            checker(vinos)
            cajaFinal.deli.deliUno = ""
            cajaFinal.deli.deliDos = ""
            cajaFinal.deli.deliTres = ""
            cajaFinal.deli.deliCuatro = ""
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
            }
            if(suma == 0){
                btnEnd.parentElement.classList.add("d-none")
                btnEnd.parentElement.classList.remove("d-flex")
            }else{
                btnEnd.parentElement.classList.remove("d-none")
                btnEnd.parentElement.classList.add("d-flex")
            }
        })
    }
}

btnEnd.addEventListener("click", ()=>{
    let cfContainer = document.createElement("div")
    cfContainer.classList.add("d-flex")
    cfContainer.classList.add("flex-column")
    cfContainer.classList.add("cfSwal")

    if(checkeadas.length == 1){

        if(cajaFinal.deli.deliCuatro != ""){
            cfContainer.innerHTML = 
            `
            <h2>CAJA FINAL</h2>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Estuche:</h3>
            <h3> ${cajaFinal.estuche}<h3>
            </div>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Botella:</h3>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            </div>
    
            <div class="d-flex flex-column flex-md-row">
            <h3 class="me-1 fw-bold">Delicatessen:</h3>
                <div>
                <h3>○ ${cajaFinal.deli.deliUno}</h3>
                <h3>○ ${cajaFinal.deli.deliDos}</h3>
                <h3>○ ${cajaFinal.deli.deliTres}</h3>
                <h3>○ ${cajaFinal.deli.deliCuatro}</h3>
                </div>
            </div>
            `
        }else
        if(cajaFinal.deli.deliTres != ""){
            cfContainer.innerHTML = 
            `
            <h2>CAJA FINAL</h2>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Estuche:</h3>
            <h3> ${cajaFinal.estuche}<h3>
            </div>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Botella:</h3>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            </div>
    
            <div class="d-flex flex-column flex-md-row">
            <h3 class="me-1 fw-bold">Delicatessen:</h3>
                <div>
                <h3>○ ${cajaFinal.deli.deliUno}</h3>
                <h3>○ ${cajaFinal.deli.deliDos}</h3>
                <h3>○ ${cajaFinal.deli.deliTres}</h3>
                </div>
            </div>
            `
        }else
        if(cajaFinal.deli.deliDos != ""){
            cfContainer.innerHTML = 
            `
            <h2>CAJA FINAL</h2>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Estuche:</h3>
            <h3> ${cajaFinal.estuche}<h3>
            </div>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Botella:</h3>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            </div>
    
            <div class="d-flex flex-column flex-md-row">
            <h3 class="me-1 fw-bold">Delicatessen:</h3>
                <div>
                <h3>○ ${cajaFinal.deli.deliUno}</h3>
                <h3>○ ${cajaFinal.deli.deliDos}</h3>
                </div>
            </div>
            `
        }else
        if(cajaFinal.deli.deliUno != ""){
            cfContainer.innerHTML = 
            `
            <h2>CAJA FINAL</h2>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Estuche:</h3>
            <h3> ${cajaFinal.estuche}<h3>
            </div>
        
            <div class="d-flex flex-row">
            <h3 class="me-1 fw-bold">Botella:</h3>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            </div>
    
            <div class="d-flex flex-column flex-md-row">
            <h3 class="me-1 fw-bold">Delicatessen:</h3>
                <div>
                <h3>○ ${cajaFinal.deli.deliUno}</h3>
                </div>
            </div>
            `
        }
    
    }else
    if(checkeadas.length == 2){
        cfContainer.innerHTML = 
        `
        <h2>CAJA FINAL</h2>
    
        <div class="d-flex flex-row align-items-center">
        <h3 class="me-1 fw-bold">Estuche:</h3>
        <h3>${cajaFinal.estuche}<h3>
        </div>
    
        <div class="d-flex flex-row">
        <h3 class="me-1 fw-bold">Botellas:</h3>
            <div>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            <h3>${cajaFinal.bebida.vinoDos}</h3>
            </div>
        </div>
        `
    }else{
        cfContainer.innerHTML = 
        `
        <h2>CAJA FINAL</h2>
    
        <div class="d-flex flex-row align-items-center">
        <h3 class="me-1 fw-bold">Estuche:</h3>
        <h3>${cajaFinal.estuche}<h3>
        </div>
    
        <div class="d-flex flex-row">
        <h3 class="me-1 fw-bold">Botella:</h3>
            <div>
            <h3>${cajaFinal.bebida.vinoUno}</h3>
            </div>
        </div>
        `
    }
    

    Swal.fire({
        html: cfContainer,
        showCloseButton: true,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Listo',
    })
})