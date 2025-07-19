const productManager = require('../service/ProductManager')
const manager = new productManager('./src/data/products.json')

module.exports ={
    getAll: async (req, res)=>{
        const result = await manager.getProducts()
        res.json(result)

    },

    getById: async (req, res)=>{ //controlador de express, para obtener el producto por id
        const result = await manager.getProductsById(req.params.id) //extrae el pid 
        result ? res.json(result): res.status(404).send('producto no encontrado')//se evalua
        //si se encuentra el producto y si no tira 404

    },
    create: async(req,res)=>{
        const result = await manager.addProduct(req.body)
    },
    update: async (req, res) =>{
        const result = await manager.updateProduct(req.params.id, req.body)
        result ? res.json(result): res.status(404).send('producto no encontrado')
    },
    delete: async (req, res) =>{
        const result = await manager.deleteProduct(req.params.id)
        result ? res.json(result): res.status(404).send('producto no encontrado')
    }

}