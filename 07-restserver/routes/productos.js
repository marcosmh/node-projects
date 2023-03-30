const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole } = require('../middlewares/validar-roles');

const { existeProductoPorId, existeCategoriaPorNombre, productoExistentePorNombre } = require('../helpers/db-validators');

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');


const router = Router();

router.get('/',  obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorNombre),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('nombre','El nombre es obligatorio.').not().isEmpty(),
    check('categoria','La categoria es obligatoria').not().isEmpty(),
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido.').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;