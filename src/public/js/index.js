const socket = io(); 





socket.on("productos", (data) => {
    renderProductos(data);
})



const renderProductos = (productos) => {
    const contenedorProductos = document.getElementById("contenedorProductos"); 
    contenedorProductos.innerHTML ="";

    productos.forEach( item => {
        const card = document.createElement("div"); 
        card.classList.add("card"); 

        card.innerHTML = `
                            <p> ${item.id} </p>
                            <p> ${item.title} </p>
                            <p> ${item.price} </p>
                            <button> Eliminar </button>
                         `
        
        contenedorProductos.appendChild(card);
        

        card.querySelector("button").addEventListener("click", () => {
            eliminarProductos(item.id); 
        })
    })
}

const eliminarProductos = (id) => {
    socket.emit("eliminarProducto", id);
}

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProducto(); 
})

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true",
    }
    socket.emit("agregarProducto", producto); 
}