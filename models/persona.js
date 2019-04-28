let moongose = require('mongoose');

let Schema = moongose.Schema;


let personaSchema = new Schema({
    index: {type: Number},
    nombre: {type: String},
    apellido: {type: String},
    email: {type: String},
    celular: {type: Number}
    }, { versionKey: false });

let Persona = moongose.model('personas', personaSchema);

module.exports = Persona;