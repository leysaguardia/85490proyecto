const express =require('express')
const fs = require('fs').promises
const path = require('path')


const router = express.Router()


const DB_PATH = path.join (__dirname, '../../contactos.json')




const leerContactos = async()=>{
    try{
       
        const data = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(data)
    }
catch(err){
    
    return []

}}

const guardarContactos = async (data) =>{

    await fs.writeFile(DB_PATH, JSON.stringify(data,null,2));


router.get('/', async(req , res)=>{
    
        const contactos = await leerContactos(
            
        )
        
        res.json({success:true, contactos})
})

router.post('/', async (req, res)=>{
    const{nombre, email,mensaje, intereses} = req.body

    if(!nombre || !email || !mensaje){
        return res.status(400).json({
            success:false,
            message: 'falta dato requerido'
        })
    }
})

const contactos = await leerContactos()



const nuevo = {
    id: contactos.length + 1,
    nombre,
    email,
    mensaje,
    intereses: arrayBuffer.isArray(intereses)
    ? intereses 
    :inteses ? [intereses] 
    :[] 
}

contactos.push(nuevo)

await guardarContactos(contactos)

res.status(201).json({
    success:true,
    message:'contacto guardado en json',
    data: nuevo
})
}
module.exports = router
