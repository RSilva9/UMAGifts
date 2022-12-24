const buttons = document.getElementsByClassName("buttn")
const cards = document.getElementsByClassName("popup")

for(let btn of buttons){
    btn.onclick = ()=>{
        for(card of cards){
            if(btn.dataset.name === card.dataset.name){
                let link = card.dataset.link
                Swal.fire({
                    html: `<div class="popup"> ${card.innerHTML} </div>`,
                    showCloseButton: true,
                    confirmButtonText:'<i class="fa fa-thumbs-up"></i> Ver en MercadoShops',
                }).then((res) =>{
                    if(res.isConfirmed){
                        window.open(link)
                    }
                })
            }
            
        }
    }
    
}