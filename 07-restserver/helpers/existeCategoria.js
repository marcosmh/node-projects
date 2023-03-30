const Categoria = require('../models/categoria');

const existeCategoria = async(id) => {
    const categoriaExiste = await Categoria.find({id});
    if (!categoriaExiste) {
        throw new Error(`Este id: ${id}, de categoria, no existe en la bd.`);
    }
}

module.exports = {
    existeCategoria
}
