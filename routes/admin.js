var express = require('express');
var router = express.Router();

const sessionMiddleware = require('../middlewares/session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Persona = require('../models/persona');
const configModel = require('../models/config');


router.post('/login', (req, res, next) => {

  var username = req.body.username;
  var pass = req.body.password;
  console.log('Login usuario : ' + username);
  console.log('Login password: ' + pass);

  var encryptPass = bcrypt.hashSync(pass);
  console.log(encryptPass);

  configModel.Config.findOne ({
    conf : configModel.CLAVE_ADMIN
  }).then( obj => {

    var clave = obj.val;
    console.log(clave);
    if(username === "admin" && bcrypt.compareSync(pass, clave)) {
      req.session.user = "admin";
      req.session.admin = true;
      res.send('Todo piola!');
    } else {
      return res.sendStatus(401);
    }
    
  }).catch(razon => {
    return res.sendStatus(401);
  });
});


router.get('/config', sessionMiddleware.session, (req, res, next) => {

  Persona.find().sort(' index ').exec((err, personas) =>{
    if (err) throw err;

    res.render('configPersonas', {personas : personas});
  });

});


module.exports = router;