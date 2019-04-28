let express = require('express');
let router = express.Router();

let Feriado = require('./../models/feriados');


router.post('/agregar', (req, res, next) => {
    
    var fecha = req.body.fechaNueva;
    console.log('Agregando fecha: ' + fecha);
    
    let feriado = new Feriado({
        fecha : fecha
    });

    feriado.save();
    res.redirect('/configPersonas/feriados');
});

module.exports = router;