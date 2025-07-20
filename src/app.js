import express from "express"; 
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
const app = express(); 
const PUERTO = 8080;
import "./database.js";

app.use(express.json()); 

app.use(express.static("./src/public"));


app.engine("handlebars", engine()); 
app.set("view engine", "handlebars"); 
app.set("views", "./src/views"); 


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})


const io = new Server(httpServer); 


import ProductManager from "./managers/product-manager.js";
const manager = new ProductManager("./src/data/productos.json");

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    
    socket.emit("productos", await manager.getProducts());

   
    socket.on("agregarProducto", async (producto) => {
        await manager.addProduct(producto);
       
        io.sockets.emit("productos", await manager.getProducts());
    })

    
    socket.on("eliminarProducto", async (id) => {
        await manager.deleteProduct(id); 

       
        io.sockets.emit("productos", await manager.getProducts());
    })
})