var express = require('express');
var router = express.Router();

const sessionMiddleware = require('../middlewares/session');

const Persona = require('../models/persona');
const Feriado = require('../models/feriados');


    router.get('/persona/nuevo', sessionMiddleware.session, function(req, res, next) {

      Persona.find().sort(' -index ').exec((err, personas) =>{
    
          if(err) throw err;    

          let ultimaPersona = personas[0];
          console.log(ultimaPersona);

          let persona = new Persona();
          let proxIndice = ultimaPersona.index + 1;
          console.log('Indice nuevo: ' + proxIndice);

          res.render('personaForm', {proxIndice : proxIndice, alta : true});
      });

    });


    router.get('/persona/modificar/:id', sessionMiddleware.session, function(req, res, next) {

        let idPersona = req.params.id;
      
        Persona.findOne({ _id: idPersona}, (err, persona) => {
          if (err) throw err
          res.render('personaForm', { persona: persona, alta : false});
        });
      
      });
      


  router.get("/persona/eliminar/:id", sessionMiddleware.session, (req, res, next) =>{
 
    let idPersona = req.params.id;
    console.log("Eliminada persona : " + idPersona);
  
    Persona.findByIdAndDelete( idPersona, (err) => {
      if (err) throw err
      res.redirect("/administrar/config");
    });
  });

  router.get("/feriados", sessionMiddleware.session, (req, res, next) =>{
 
    Feriado.find().sort(' _id ').exec((err, feriados) => {

      if(err) throw err;

      res.render('listaFeriados', {feriados : feriados});
    });
  });

module.exports = router;