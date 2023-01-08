let container = document.querySelector("#cardCont")
import {
    boxStock
} from "./stocks/box.js"

const SwalBtns = (buttons) => {
    for (let btn of buttons) {
        btn.onclick = () => {
            boxStock.forEach((box) => {
                if (btn.dataset.name == box.codigo) {
                    Swal.fire({
                        html: box.text,
                        showCloseButton: true,
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Ver en MercadoShops',
                    }).then((res) => {
                        if (res.isConfirmed) {
                            window.open(box.link)
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

// FILTROS

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
                <div class="cCard wow fadeInDown" data-wow-delay="0.1s" data-name=${box.tipo}>
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
    }else{
        renderAll()
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
    boxStock.forEach((box) =>{
        if (tmId == "asd") {
            if (box.tipo == tId) {
                let cardRow = document.createElement('div')

                cardRow.innerHTML += 
                `
                <div class="cCard wow fadeInDown" data-wow-delay="0.1s" data-name=${box.tipo}>
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
                <div class="cCard wow fadeInDown" data-wow-delay="0.1s" data-name=${box.tipo}>
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