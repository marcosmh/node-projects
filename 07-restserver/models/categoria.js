const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio.'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'El usuario es obligatorio.']
    }

});

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id,nombre, ...categoria } = this.toObject();
    categoria.uid = _id;
    categoria.nombre = nombre.toUpperCase();
    return categoria;
}


module.exports = model('Categoria', CategoriaSchema);