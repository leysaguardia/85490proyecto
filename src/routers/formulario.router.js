const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    res.render('home',{
        layout: 'main', 
        title:'formulario de contacto'
    })
})



router.post('/enviar',(req,res)=>{
    
    const {nombre, email, mensaje} = req.body 
    let intereses = req.body.intereses;
    
   
     if(!intereses){
         intereses = []

     } else if(!Array.isArray(intereses)){
         intereses = [intereses]
     }

    

    res.render('resultado',{
        layout:'main',
        title:'resultado',
        nombre,

        email,
        mensaje,
        intereses,
        sinIntereses: intereses.length === 0
    })

})

module.exports = router;