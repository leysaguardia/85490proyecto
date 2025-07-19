const express = require('express')
const router = express.Router()

//app.get => lo modificamos por router.get
router.get('/', (req,res)=>{
    res.render('home',{
        layout: 'main', 
        title:'formulario de contacto'
    })
})

//ruta para envio de formulario

router.post('/enviar',(req,res)=>{
    //constante para extraer los datos que envia el usuario
    const {nombre, email, mensaje} = req.body //destructuring
    let intereses = req.body.intereses;
    
    //asegura de que intereses sea siempre array
    // let intereses = [].concat(req.body.intereses || []);
     if(!intereses){
         intereses = []

     } else if(!Array.isArray(intereses)){
         intereses = [intereses]
     }

    //renderizamos la informacion en un una vista resultado

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