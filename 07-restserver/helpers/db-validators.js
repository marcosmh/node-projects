const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

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

const existeCategoriaPorId = async(id) => {
    const categoriaExiste = await Categoria.find({id});
    if (!categoriaExiste) {
        throw new Error(`Este id: ${id}, de categoria, no existe en la bd.`);
    }
}

const existeCategoriaPorNombre = async(nombre) => {
    const categoriaExiste = await Categoria.find({nombre});
    if (!categoriaExiste) {
        throw new Error(`Este nombre: ${nombre}, de categoria, no existe en la bd.`);
    }
}

const existeProductoPorId = async(id) => {
    const productoExiste = await Producto.find({id});
    if (!productoExiste) {
        throw new Error(`Este id: ${id}, de producto, no existe en la bd.`);
    }
}

const productoExistentePorNombre = async(nombre) => {
    const productoExiste = await Producto.find({nombre});
    if (productoExiste.nombre) {
        throw new Error(`Este nombre: ${nombre}, de producto, ya existe en la bd.`);
    } 
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida. Colecciones Permitidas: ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeCategoriaPorNombre,
    existeProductoPorId,
    productoExistentePorNombre,
    coleccionesPermitidas
}