let container = document.getElementById("cardCont")


if(window.location.pathname=='/productos.html'){
    
    fetch("./json/box.json")
    .then((res)=>res.json())
    .then((boxs)=>{
        for(let i=0; i<boxs.length; i+=1){
            let cardRow = document.createElement('div')
            
            cardRow.innerHTML += `
            <div class="cCard wow fadeInDown" data-wow-delay="0.2s">
            <img src="${boxs[i].img}" alt="...">
            <a class="buttn btnProds" data-name=${boxs[i].codigo}>Ver más</a>
            </div>
            `  
            cardRow.className= "col-6 col-md-4 p-0"
            container.append(cardRow)

        }
       
        
    })
    .finally(()=>{
        const buttons = document.getElementsByClassName("btnProds")
        SwalBtns(buttons)
    })
}

const SwalBtns = (buttons)=>{
    for(let btn of buttons){
        btn.onclick = ()=>{
            fetch("./json/box.json")
            .then((res)=>res.json())
            .then((boxs)=>{
                for(let box of boxs){
                    if(btn.dataset.name == box.codigo){
                        Swal.fire({
                            html: box.text,
                            showCloseButton: true,
                            confirmButtonText:'<i class="fa fa-thumbs-up"></i> Ver en MercadoShops',
                        }).then((res)=>{
                            if(res.isConfirmed){
                                window.open(box.link)
                            }
                        })
                    }
                }
            })    
        }
    }
}

btnPrueba = document.getElementById("test")
btnPrueba.onclick = ()=>{
    
    fetch("./json/box.json")
    .then((res)=>res.json())
    .then((boxs)=>{
        container.innerHTML = ""
        for(let box of boxs){
            if(box.tam == "doble"){
                
                let cardRow = document.createElement('div')

                cardRow.innerHTML += `
                <div class="cCard wow fadeInDown" data-wow-delay="0.2s">
                <img src="${box.img}" alt="...">
                <a class="buttn btnProds" data-name=${box.codigo}>Ver más</a>
                </div>
                `  
                cardRow.className= "col-6 col-md-4 p-0"
                container.append(cardRow)
                
            }else{
                console.log("error")
            }
        }
       
        
    })
    .finally(()=>{
        const buttons = document.getElementsByClassName("btnProds")
        SwalBtns(buttons)
    })
}