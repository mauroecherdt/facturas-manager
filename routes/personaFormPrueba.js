let express = require('express');
let router = express.Router();

let mongoose = require('./../config/mongo');
let Persona = require('./../models/persona');


router.post('/persona/operar', (req, res, next) => {
    
    console.log(req.body);  

    var idPersona = req.body._id;
    if(idPersona === ''){

        Persona.find().sort(' -index ').exec((err, personas) =>{
    
            if(err) throw err;    

            let ultimaPersona = personas[0];
            console.log(ultimaPersona);
    
            let per = new Persona({
                index: ultimaPersona.index + 1,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                celular: req.body.celular
            });
            console.log('Insertando persona: ' + per);
            per.save();
            res.redirect('/administrar/config');
    
        });
    } else {
        
        Persona.findByIdAndUpdate( idPersona, req.body, (err, per) => {

            if(err) throw err;

            console.log('Actualizando persona: ' + per);
            res.redirect('/administrar/config');
        });
    }

    

});

module.exports = router;