

var express = require('express');
var router = express.Router();

let mongoose = require('./../config/mongo');
var Persona = require('./../models/persona');

/* GET home page. */
router.get('/', function(req, res, next) {

  Persona.find((err, personas)=>{
    if(err) throw err;

    console.log(personas);

    var cantidadPersonas = personas.length;


    var oneDay = 24*60*60*1000;
    var dref = new Date(2019, 2, 8, 12, 0, 0);
    var date = new Date();
    var diffDays = Math.floor(Math.abs((dref.getTime() - date.getTime())/(oneDay)));
    console.log(diffDays);
    var indexProx = ( Math.trunc(diffDays / 7) % cantidadPersonas );

    var arrayProximos = personas.splice(indexProx); 
    var arrayListaOrdenada = arrayProximos.concat(personas);

    for (var i = 0; i < cantidadPersonas; i++){
      var tempdate = new Date(dref.getTime() + Math.floor(diffDays/7)*7*oneDay + (((i+1)*7) * oneDay));
      var fecha = rpad(tempdate.getDate()) + "/" + rpad(tempdate.getMonth()+1);

      arrayListaOrdenada[i].fecha = fecha;
    }
  

    res.render('index', { personas: arrayListaOrdenada });
  });
  
});

router.get('/administrar', function(req, res, next) {
  res.render('administrar');
});


function rpad(value){
  if(value < 10)
    return "0"+value;
  else
    return value;
}


module.exports = router;
