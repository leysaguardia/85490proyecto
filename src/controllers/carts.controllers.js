const CartManager = require('../service/CartManager')
const { getById } = require('./product.controllers')
const manager = new CartManager('./src/data/carts.json')

module.exports ={
    create: async (req, res)=>{
        const result = await manager.createCart()
        res.status(201).json(result)

    },

    getById:async(req,res)=>{
        const result = await manager.getCartById(req.params.cid) 
        result ? res.json(result): res.status(404).send('carrito no encontrado')
    },

     addProduct:async(req,res)=>{
        const result = await manager.addProductToCart(req.params.cid, req.params.pid) 
        result ? res.json(result): res.status(404).send('carrito no encontrado')
    }
}