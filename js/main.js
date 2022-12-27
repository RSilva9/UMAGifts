let container = document.querySelector("#cardCont")

function renderAll() {
    container.innerHTML = ""
    
    fetch("./json/box.json")
        .then((res) => res.json())
        .then((boxs) => {
            for (let i = 0; i < boxs.length; i += 1) {
                let cardRow = document.createElement('div')

                cardRow.innerHTML += `
            <div class="cCard">
            <img src="${boxs[i].img}" alt="...">
            <a class="buttn btnProds" data-name=${boxs[i].codigo}>Ver más</a>
            </div>
            `
                cardRow.className = "col-6 col-md-4 p-0"
                container.append(cardRow)

            }
        })
        .finally(() => {
            const buttons = document.getElementsByClassName("btnProds")
            SwalBtns(buttons)
        })
}

if (window.location.pathname == '/productos.html') {
    renderAll()
}

if(window.innerWidth >= 768){
    let acc = document.querySelector(".accordion-collapse")
    acc.classList += "show"
}

const SwalBtns = (buttons) => {
    for (let btn of buttons) {
        btn.onclick = () => {
            fetch("./json/box.json")
                .then((res) => res.json())
                .then((boxs) => {
                    for (let box of boxs) {
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
                    }
                })
        }
    }
}

// FILTROS

const tipo = document.getElementsByName("tipo")
const tam = document.getElementsByName("tam")
let deli = document.getElementById("deli")
let btnReset = document.getElementById("bReset")

btnReset.onclick = () => {
    window.location.reload()
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
        fetch("./json/box.json")
            .then((res) => res.json())
            .then((boxs) => {
                for (let box of boxs) {
                    if (box.deli == true) {
                        let cardRow = document.createElement('div')

                        cardRow.innerHTML += `
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
            .finally(() => {
                const buttons = document.getElementsByClassName("btnProds")
                SwalBtns(buttons)
            })

    } else {
        window.location.reload()
    }
})

for (let t of tipo) {
    t.addEventListener('change', () => {
        console.log(t.id)
        if(t.id == "bolsa"){
            for(let tm of tam){
                tm.checked = false
                tm.disabled= true
            }
        }else{
            for(let tm of tam){
                tm.checked = false
                tm.disabled= false
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
    fetch("./json/box.json")
        .then((res) => res.json())
        .then((boxs) => {
            container.innerHTML = ""
            for (let box of boxs) {
                if (tmId == "asd") {
                    if (box.tipo == tId) {
                        let cardRow = document.createElement('div')

                        cardRow.innerHTML += `
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

                        cardRow.innerHTML += `
                        <div class="cCard wow fadeInDown" data-wow-delay="0.1s" data-name=${box.tipo}>
                        <img src="${box.img}" alt="...">
                        <a class="buttn btnProds" data-name=${box.codigo}>Ver más</a>
                        </div>
                        `
                        cardRow.className = "col-6 col-md-4 p-0"
                        container.append(cardRow)
                    }
                }
            }
        })
        .finally(() => {
            const buttons = document.getElementsByClassName("btnProds")
            SwalBtns(buttons)
        })
}