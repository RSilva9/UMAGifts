export const cart = document.getElementById("cart")
export const carrito = JSON.parse(localStorage.getItem("carrito"))

const cDisplay = document.getElementById("carroDisplay")


carrito.forEach(item => {
    let itemCart = document.createElement("div")
    itemCart.innerHTML = item

    cDisplay.append(itemCart)
});