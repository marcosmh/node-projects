
const DBValidators = require('./db-validators');
const ValidaCategoria = require('./existeCategoria');
const GenerarJWT = require('./generar-jwt');
const GoogleVerify = require('./google-verify');
const SubirArchivos = require('./subir-archivos');



module.exports = {
    ...DBValidators,
    ...ValidaCategoria,
    ...GenerarJWT,
    ...GoogleVerify,
    ...SubirArchivos
}