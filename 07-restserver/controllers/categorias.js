const { response, request } = require('express');

const Categoria = require('../models/categoria');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

   const [total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });
}

//ObtenerCategoria - populate
const obtenerCategoria = async(req = request, res = response) => {

    const { id } = req.params;
    
    const query = { _id: id, estado: true };
    const categoria = await Categoria.find(query).populate('usuario','nombre');
    
    res.json({categoria});
}


const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    //Validar si ya existe la categoria
    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe.`
        });
    }

    // Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // Guardaer en base de datos
    const categoria = new Categoria(data);
    await categoria.save();


    res.status(201).json(categoria);
}

// actualizarCategoria
const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    //const { _id, estado, ...resto } = req.body;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id,data, { new: true });
    console.log(categoria);

    res.json({ categoria });

}

// borrarCategoria - estado: false
const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    
    const categoria = await Categoria.findByIdAndDelete(id, {estado: false},{ new: true });

    res.json({
        msg: 'Categoria Eliminada.',
        categoria
    });
}





module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}