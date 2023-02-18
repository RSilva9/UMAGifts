let container = document.querySelector("#cardCont")
const boxArmadas = (JSON.parse(localStorage.getItem('armadas')) || [])

async function getStock() {
    const response = await fetch("../json/box.json")
    return response.json();
}

const boxStock = await getStock()

const SwalBtns = (buttons) => {
    for (let btn of buttons) {
        btn.onclick = () => {
            boxStock.forEach((box) => {
                if (btn.dataset.name == box.codigo) {
                    Swal.fire({
                        html: `
                        <div class="popup">
                        <img src="${box.img}">
                        ${box.text}
                        <h4 class="mt-2">$${box.precio}</h4>
                        </div>
                        `,
                        showCloseButton: true,
                        showDenyButton: false,
                        confirmButtonColor: '#9ebc4a',
                        confirmButtonText: 'Agregar al carrito',
                    }).then(async (res) => {
                        if (res.isConfirmed) {
                            const { value: cantidad } = await Swal.fire({
                                title: '¿Cuántas BOX querés agregar al carrito?',
                                input: 'number',
                                confirmButtonText: 'Agregar al carrito',
                                confirmButtonColor: '#9ebc4a',
                                inputValidator: (value) => {
                                    if (!value || value <= 0) {
                                        return 'Indicá una cantidad válida'
                                    }
                                }
                            })
                            if (cantidad) {
                                let existe = false

                                boxArmadas.forEach(b=>{
                                    if(b.codigo == btn.dataset.name){
                                        b.cant += Number(cantidad)
                                        existe = true
                                    }
                                })

                                const addedBox = {
                                    cant: Number(cantidad),
                                    codigo: btn.dataset.name,
                                    precio: box.precio
                                }

                                if(existe == false){
                                    boxArmadas.push(addedBox)
                                }

                                localStorage.setItem("armadas", JSON.stringify(boxArmadas))

                                Swal.fire({
                                    icon: 'success',
                                    confirmButtonColor: '#9ebc4a',
                                    denyButtonColor: '#7c3359',
                                    confirmButtonText: 'Seguir comprando',
                                    denyButtonText: 'Ir al carrito',
                                    showDenyButton: true,
                                    title: `Agregaste ${cantidad} BOX al carrito`,
                                }).then((res)=>{
                                    if(res.isDenied){
                                        location.href = "carrito.html" 
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    }
}

function renderAll() {

    container.innerHTML = ""

    boxStock.forEach((producto) => {
        let cardRow = document.createElement('div')

        cardRow.innerHTML +=
            `
            <div class="cCard">
            <h3 class="mt-2">BOX ${producto.codigo}</h3>
            <h5>$${producto.precio}</h5>
            <img src="${producto.img}" alt="...">
            <a class="buttn btnProds" data-name=${producto.codigo}>Ver más</a>
            </div>
            `
        cardRow.className = "col-6 col-md-4 p-0"
        container.appendChild(cardRow)
    })

    const buttons = document.getElementsByClassName("btnProds")
    SwalBtns(buttons)
}

if (window.location.pathname == '/productos.html') {
    renderAll()
}

// FILTROS -------------------------------------

const tipo = document.getElementsByName("tipo")
const tam = document.getElementsByName("tam")
let deli = document.getElementById("deli")
let btnReset = document.getElementById("bReset")

btnReset.onclick = () => {
    deli.checked = false
    tipo.forEach(t => {
        t.checked = false
        t.disabled = false
    })
    tam.forEach(tm => {
        tm.checked = false
        tm.disabled = false
    })
    renderAll()
}

deli.addEventListener('change', () => {
    if (deli.checked) {
        for (let t of tipo) {
            t.checked = false
            t.disabled = true
        }
        for (let tm of tam) {
            tm.checked = false
            tm.disabled = true
        }
        container.innerHTML = ""
        boxStock.forEach((box) => {
            if (box.deli == true) {
                let cardRow = document.createElement('div')

                cardRow.innerHTML +=
                `
                <div class="cCard">
                <h3 class="mt-2">BOX ${box.codigo}</h3>
                <h5>$${box.precio}</h5>
                <img src="${box.img}" alt="...">
                <a class="buttn btnProds" data-name=${box.codigo}>Ver más</a>
                </div>
                `
                cardRow.className = "col-6 col-md-4 p-0"
                container.append(cardRow)
            }
        })
        const buttons = document.getElementsByClassName("btnProds")
        SwalBtns(buttons)
    } else {
        renderAll()
        for (let t of tipo) {
            t.disabled = false
        }
        for (let tm of tam) {
            tm.disabled = false
        }
    }
})

for (let t of tipo) {
    t.addEventListener('change', () => {
        if (t.id == "bolsa") {
            for (let tm of tam) {
                tm.checked = false
                tm.disabled = true
            }
        } else {
            for (let tm of tam) {
                tm.checked = false
                tm.disabled = false
            }
        }
        if (t.checked)
            tipYtam(t)
    })

}

function tipYtam(t, del) {
    for (let tm of tam) {
        if (tm.checked) {
            renderTipo(t.id, tm.id)
            return;
        } else if (!(tm.checked)) {
            renderTipo(t.id, "asd")
        }

        tm.addEventListener('change', () => {
            if (tm.checked) {
                renderTipo(t.id, tm.id)
            }
        })
    }
}

function renderTipo(tId, tmId, del) {
    container.innerHTML = ""
    boxStock.forEach((box) => {
        if (tmId == "asd") {
            if (box.tipo == tId) {
                let cardRow = document.createElement('div')

                cardRow.innerHTML +=
                `
                <div class="cCard">
                <h3 class="mt-2">BOX ${box.codigo}</h3>
                <h5>$${box.precio}</h5>
                <img src="${box.img}" alt="...">
                <a class="buttn btnProds" data-name=${box.codigo}>Ver más</a>
                </div>
                `
                cardRow.className = "col-6 col-md-4 p-0"
                container.append(cardRow)
            }
        } else if (tmId != "asd") {
            if (box.tipo == tId && box.tam == tmId) {
                let cardRow = document.createElement('div')

                cardRow.innerHTML +=
                `
                <div class="cCard">
                <h3 class="mt-2">BOX ${box.codigo}</h3>
                <h5>$${box.precio}</h5>
                <img src="${box.img}" alt="...">
                <a class="buttn btnProds" data-name=${box.codigo}>Ver más</a>
                </div>
                `
                cardRow.className = "col-6 col-md-4 p-0"
                container.append(cardRow)
            }
        }
    })
    const buttons = document.getElementsByClassName("btnProds")
    SwalBtns(buttons)
}