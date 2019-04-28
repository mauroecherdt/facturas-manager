var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FECHA_INICIO = 'fechaInicio';
const CLAVE_ADMIN = 'claveAdmin';


var configSchema = new Schema({
    conf : { type: String},
    val : { type: String}
});

var Config = mongoose.model('configs', configSchema);
module.exports = {
    FECHA_INICIO,
    CLAVE_ADMIN,
    Config
}