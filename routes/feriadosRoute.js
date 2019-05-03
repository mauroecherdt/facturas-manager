let express = require('express');
let router = express.Router();

let Feriado = require('./../models/feriados');

router.get('/eliminar/:id', (req, res, next) => {

    var idFeriado = req.params.id;
    console.log('Elminando fecha con id: ' + idFeriado);

    Feriado.findByIdAndDelete( idFeriado, (err) => {
        if (err) throw err
        res.redirect("/configPersonas/feriados");
      });
});

router.post('/agregar', (req, res, next) => {
    
    var fecha = req.body.fechaNueva;
    console.log('Agregando fecha: ' + fecha);
    
    var fechaArray = fecha.split("-");
    var ano = fechaArray[0];
    var mes = fechaArray[1] - 1;
    var dia = fechaArray[2];


    let feriado = new Feriado({
        _id : ano + mes + dia,
        fecha : new Date(ano, mes, dia)
    });

    feriado.save((err, fer) => {
        if(err){
            res.redirect('/configPersonas/feriados');     
        } else {
            res.redirect('/configPersonas/feriados');     
        }
    });
    
});

module.exports = router;