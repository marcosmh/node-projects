const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const ExisteRole = await Role.findOne({ rol });
    if (!ExisteRole) {
        throw new Error(`El rol no existe en la base de datos.`);
    }
}

const existeEmail = async(correo) => {
    const emailExiste = await Usuario.findOne({ correo });
    if (emailExiste) {
        throw new Error(`Este correo: ${correo}, ya existe en la bd.`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`Este id: ${id}, no existe en la bd.`);
    }

}




module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}