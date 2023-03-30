
const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    } 

    const regex = new RegExp(termino, 'i');
    const usuario = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex},{rol: regex}],
        $and: [{estado: true}]
    });

    return res.json({
        results: usuario
    });

}

const buscarCategorias = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId) {
        const categoria = await Categoria.findById(termino).populate('usuario','nombre');
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    } 

    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find({
        $or: [ {nombre: regex} ],
        $and: [ {estado: true} ]
    });

    return res.json({
        results: categoria
    });

}

const buscarProductos = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if(esMongoId) {
        const producto = await Producto.findById(termino)
            .populate('usuario','nombre')
            .populate('categoria','nombre');

        return res.json({
            results: (producto) ? [producto] : []
        });
    } 
 
    let preciox = 0;
    if( !Number.isInteger(termino) ) {
        console.log('si es numero')
        preciox = parseFloat(termino);
        console.log("preciox: ",preciox);
    }

    let regex = '';
    if(termino.length > 0) {
        regex = new RegExp(termino, 'i');
        console.log("string: ",regex);
    }
    
    const producto = await Producto.find({
        $or: [{ nombre: regex },{ descripcion: regex },{ precio: preciox }],
        $and: [ {estado: true} ]
    });

    return res.json({
        results: producto
    });

}

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las Colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;   
        
        default:
            res.status(500).json({
                msg: `No existe la colección: ${coleccion}`
            });
        break;
    }

    
}



module.exports = {
    buscar
}
