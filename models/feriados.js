var mongoose = require('mongoose');


var schema = new mongoose.Schema({
    fecha : {type : Date}
});


schema.virtual('fechaFormateada').get(function () {

    var dia = this.fecha.getMonth() + 1;
    var mes = this.fecha.getDay();
    var ano = this.fecha.getFullYear();

    return dia + "/" + mes + "/" + ano;
  });

var Feriado = mongoose.model('feriados', schema);

module.exports = Feriado;
 