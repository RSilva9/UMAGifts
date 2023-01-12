const customBoxDisplay = document.getElementById("customBoxDisplay")
const limpiar = document.getElementById("limpiar")

if(localStorage.getItem("cajas")){
    const cajas = JSON.parse(localStorage.getItem("cajas"))
    cajas.forEach(caja => {
        let divBox = document.createElement("div")
        if(caja.deli.deliUno != ""){
            divBox.innerHTML =
            `
            <hr>
            <div class="d-flex flex-row align-items-center">
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
                        <h3>Delicatessen
                        <button class="buttn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
                        </svg>

                        </button>
                        </h3>
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
                        
                        
                        </h3>
                        
                    </div>
                </div>
            </div>
            `
        }else{
            divBox.innerHTML =
        `
        <hr>
        <div class="d-flex flex-row align-items-center">
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
        `
        }
        
        customBoxDisplay.appendChild(divBox)
    });
}

limpiar.onclick = ()=>{
    localStorage.clear()
}