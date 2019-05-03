var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    _id : {type : String},
    fecha : {type : Date}
});


schema.virtual('fechaFormateada').get(function () {

    var mes = this.fecha.getMonth() + 1;
    var dia = this.fecha.getDate();
    var ano = this.fecha.getFullYear();

    return rpad(dia) + "/" + rpad(mes) + "/" + ano;
  });

  function rpad(value){
    if(value < 10)
      return "0"+value;
    else
      return value;
  }


var Feriado = mongoose.model('feriados', schema);

module.exports = Feriado;
 