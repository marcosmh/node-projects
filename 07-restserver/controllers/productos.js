const { response, request } = require('express');

const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const obtenerProductos = async(req = request, res = response) => {
    console.log('Productos::obtenerProductos...');

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    });
}


const obtenerProducto = async(req = request, res = response) => {
    console.log('Productos::obtenerProducto...');

    const { id } = req.params;
    
    const query = { _id: id, estado: true };
    const producto = await Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre');
    
    res.json({producto});

}

const crearProducto = async(req = request, res = response) => {
    console.log('Productos::crearProducto...');

    const { nombre,precio,descripcion, categoria } =  req.body;
    categoria.nombre = categoria.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre: categoria});
    
    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoria}, no existe en la bd.`
        });
    }
    
    const data = {
        nombre,
        descripcion,
        precio,
        categoria: categoriaDB._id,
        usuario: req.usuario._id || '640fc4d1d7ca120fd4906dd4'
    };
    
    const producto = new Producto(data);
    producto.save();

    res.status(200).json({
        producto
    });
}

const actualizarProducto = async(req = request, res = response) => {
    console.log('Productos::actualizarProducto...');

    const { id } = req.params;
    
    const { estado, categoria, ...data } = req.body;
    categoria.nombre = categoria.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre: categoria, estado: true});
    
    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoria}, no existe en la bd.`
        });
    }

    const existeNombreProducto = await Producto.findOne({nombre: req.body.nombre});
    if(existeNombreProducto) {
        return res.status(400).json({
            msg: `Este nombre de  ${existeNombreProducto.nombre}, ya existe en la bd.`
        });
    }

    const producto = await Producto.findByIdAndUpdate(id,data,{ new: true });
    
    res.json({
        producto
    });
    
}

const borrarProducto = async(req = request, res = response) => {
    console.log('Productos::borrarProducto...');

    const { id } = req.params;

    const producto = await Producto.findByIdAndDelete(id, {estado: false},{ new: true });

    res.json({
        msg: 'Producto Eliminado',
        producto
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}