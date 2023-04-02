const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validarRoles = require('./validar-roles');
const esAdminRole = require('./validar-roles');
const tieneRole = require('./validar-roles');
const validarArchivo = require('./validar-archivo');


module.exports = {
    validarCampos,
    validarJWT,
    validarRoles,
    esAdminRole,
    tieneRole,
    validarArchivo
}